
  /*!
 * This is a node-feedparser example
 * 
 */
var Twit = require('twit');
var async = require('async');
var FeedParser = require('feedparser');
var fs = require('fs');
var Info = require("../models/infos");
var request = require('request');
var RateLimiter = require('limiter').RateLimiter;

var RssCrawler = function () {
  this.init();
}

RssCrawler.prototype = {
  items: [],
  selectedItems: [],
  rendezVousCounter: 0,
  feedListCrawled : false,

  /**
   * Constructor
   * @return {RssCrawler} this
   */
  init:function(){
    this.T = new Twit({ //don't try it's fake id :-D
      consumer_key: 'vXaVn4jZ6Kx5jrsIk769Hb9gV',
      consumer_secret: 'DuBR4ndQ6X9qIgFkfwHdOkI52JLBzbmqG5W3zNTFMha2u5LV1q',
      access_token: '2384827184-qRIWyOsmrPYooELlo0idhbkQQJP2wnf19u2kVRt',
      access_token_secret: 'ZAOgyb6IYHXNFiTrkV6itwxp98pyfu4HpgMfKkVR1Yl2I'
    });

    this.limiter = new RateLimiter(160, 15*60*1000), //170 req every 15 min

    console.log('RssCrawler initialised');

    return this;
  },
  /**
   * crawl each feed of the list. then calcul score and select best items
   * @param  {Array} feedList   List of feedObject - url and categorieId
   * @return {RssCrawler}          [description]
   */
  crawl: function(feedList){
    for (var i = 0; i < feedList.length; i++) {
      var feedObject = feedList[i];
      this.crawlFeed(feedObject.feedUrl, feedObject.categorieId, (i==(feedList.length)-1)); //last = true for the last element
    }
  },
  /**
   * crawl a feed
   * @param  {string} feed        feed url
   * @param  {integer} categorieId categorie of the feed
   * @param  {Boolean} last        if it's the last feed, it switch the rendezvous var feedListCrawled
   * @return {RssCrawler}         this
   */
  crawlFeed: function(feed, categorieId, last){
    var self = this;
    var req = request(feed);
    var feedparser = new FeedParser();

    var feedItems = [];

    req.on('error', function (err) {
      console.log("err: ",err);
    });

    req.on('response', function (res) {
      var stream = this;
      if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
      stream.pipe(feedparser);
    });

    feedparser
      .on('error', function (error) {
        console.error(error);
      })
      .on('meta', function (meta) {
        console.log('===== %s =====', meta.title);
      })
      .on('readable', function() {
        var stream = this, item;
        while (this.item = stream.read()) {
          this.item.categorieId = categorieId;
          feedItems.push(this.item);
        }
      })
      .on('end', function(){
        self.feedListCrawled = last;
        self.getTweets.bind(self)(feedItems);
      });
    return this;
  },
  getTweets: function(feedItems){ //rempli les item.twitterData
    var self = this;
    this.rendezVousCounter += feedItems.length;
    feedItems.forEach(function(item){
      var url = item.link;
      var nextResultsParams = "";

      self.limiter.removeTokens(1, function(err, remainingRequests) {
        self.twitterCrawler(url, nextResultsParams, item);
      });
    });
  },

  /**
   * (async) crawl twitter search api
   * @param  {String} url     the link to serach on twitter
   * @param  {integer} nextResultsParams  offset for link with a lot of tweets
   * @param  {Object} item    the function fill item.twitterData
   * @return {rssCrawler}       this
   */
  twitterCrawler: function(url, nextResultsParams, item){
    var self = this;
    if(!item){
      console.log("err : item is undefined : url : ", url);
      this.rendezVousCounter--;
      return;
    }
    if(item.twitterData){
      console.log("err : item is undefined : url : ", url);
      this.rendezVousCounter--;
      return;
    }

    this.T.get('search/tweets'+nextResultsParams,
      { q: (url !== "") ? encodeURI(url) : undefined, count: 100 },
      function(err, data, response) {
      if(err){
        self.rendezVousCounter--; //todo, try again with this item
        console.log(err);
        if(err == "trop de requete en 15 minutes"){
          //sleep_during( 15min - Date.now + self.twitterRequestTime);
          //self.twitterRequestTime = Date.now;
          //self.twitterCrawler(url, nextResultsParams, item)
        }
        return;
      }
      //console.log(JSON.stringify(data));
      item.twitterData = data.statuses;
      self.parseTwitterData.bind(self)(item);
    });
    return this;
  },
  /**
   * analyse twitter search api result in order to calculate a score
   * @param  {Object} item item to hidrate with calculated datas
   * @return {RssCrawler}      this
   */
  parseTwitterData: function(item){
    var RT = 0;
    var favCount = 0;
    for (var i = 0; i < item.twitterData.length; i++) {
      RT += item.twitterData[i].retweet_count;
      favCount += item.twitterData[i].favorite_count;
    };
    item.analysedInfos = {RT : RT, favCount : favCount, tweetCount : item.twitterData.length};
    item.analysedInfos.score = this.calculateScore(RT, favCount, item.twitterData.length);

    console.log('RT : '+RT+', fav : '+favCount+', score : '+item.analysedInfos.score+
      ', nb: '+item.twitterData.length+', article: '+item.title);

    this.items.push(item);

    this.selectItems();
    return this;
  },

  /**
   * Select the 5 best item. One from each categorie.
   * @return {RssCrawler} this
   */
  selectItems: function(){
    this.rendezVousCounter--;
    if(this.rendezVousCounter <= 0 && this.feedListCrawled){ //TODO check this parameters
      this.items.sort(function(a,b){
        if(!a.analysedInfos){
          a.analysedInfos = {score: 0};
        }
        if(!b.analysedInfos){
          b.analysedInfos = {score: 0};
        }
        return -(a.analysedInfos.score - b.analysedInfos.score);
      });
      var categoriesUsed = [];
      for (var i = 0; i < this.items.length && this.selectedItems.length < 5; i++) {
        if(!categoriesUsed[this.items[i].categorieId]){
          this.selectedItems.push(this.items[i]);
          categoriesUsed[this.items[i].categorieId] = true;
        }
      };
      this.save();
    }

    return this;
  },

  save: function(){
    for (var i = 0; i < this.selectedItems.length; i++) {

      var enclosure;
      if(this.selectedItems[i].enclosures && this.selectedItems[i].enclosures[0]){
        enclosure = this.selectedItems[i].enclosures[0].url;
      }

      var info = {
        title: this.selectedItems[i].title,
        description: this.selectedItems[i].description,
        categorieId: this.selectedItems[i].categorieId,
        link: this.selectedItems[i].link, //non urlencoded
        img: enclosure, //url of image non urlencoded
        clickCount: 0,
        twitter : {
          RT: this.selectedItems[i].analysedInfos.RT, //nb of RT,
          favCount : this.selectedItems[i].analysedInfos.favCount,
          tweetCount : this.selectedItems[i].analysedInfos.tweetCount
        },
        score : this.selectedItems[i].analysedInfos.score
      };
      console.log("saving :", info.title," score : ", info.score);

      new Info(info).save(function (err, data) {
        if (err){
          console.log(err);
          console.log(JSON.stringify(info));
          return;
        }
        // saved!
      });
    };
  },

  /**
   * calculate the social score
   * @param  {integer} RT         Number of retweet
   * @param  {integer} favCount   Number of twitter favorite
   * @param  {integer} tweetCount Number of tweet
   * @return {integer}            score
   */
  calculateScore : function(RT, favCount, tweetCount){
    var score = RT*3 + favCount + tweetCount*2;
    return score;
  }
}

module.exports = RssCrawler;