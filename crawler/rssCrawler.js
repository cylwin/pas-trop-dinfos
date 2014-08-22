
var async = require('async');
var FeedParser = require('feedparser');
var Info = require("../models/infos");
var request = require('request');
var Rendezvous = require('./rendezvous');
var Twitter = require('./twitter');

var iconv = require('iconv-lite');


var RssCrawler = function () {
  this.init();
}

RssCrawler.prototype = {
  items: [],
  selectedItems: [],

  /**
   * Constructor
   * @return {RssCrawler} this
   */
  init:function(){
    var self = this;
    this.items = [];
    this.selectedItems = [];

    this.rendezvous = new Rendezvous(this.selectItems);
    this.rendezvous.setCallback(function(){
      self.selectItems();
      self.save();
    });
    console.log('RssCrawler initialised');

    this.twitter = new Twitter();

    return this;
  },

  /**
   * crawl each feed of the list. then calcul score and select best items
   * @param  {Array} feedList   List of feedObject - url and categorieId
   * @return {RssCrawler}          this
   */
  crawl: function(feedList){
    for (var i = 0; i < feedList.length; i++) {
      var feedObject = feedList[i];
      this.crawlFeed(feedObject.feedUrl, feedObject.categorieId, feedObject.charset); //last = true for the last element
    }
    return this;
  },
  /**
   * (async) parse a feed
   * @param  {string} feed        feed url
   * @param  {integer} categorieId categorie of the feed
   * @return {RssCrawler}         this
   */
  crawlFeed: function(feed, categorieId, charset){
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

      if(charset && charset !== "utf8"){
        var converterStream = iconv.decodeStream(charset);
        stream.pipe(converterStream).pipe(feedparser);
      }else{
        stream.pipe(feedparser);
      }
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
        self.rendezvous.addTokens(feedItems.length);
        var callbackSuccess = function(item){
          self.items.push(item);
          self.rendezvous.ready();
        }
        var callbackError = function(){
          self.rendezvous.ready();
        }
        self.twitter.getTweets(feedItems, callbackSuccess, callbackError);
      });
    return this;
  },


  /**
   * Select the 5 best item. One from each categorie. And store the in selected items
   * @return {RssCrawler} this
   */
  selectItems: function(){
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
      for (var i = 0; i < this.items.length && this.selectedItems.length <= 5; i++) {
        if(typeof this.items[i].categorieId == undefined){
          continue;
        }
        if(!categoriesUsed[this.items[i].categorieId]){
          this.selectedItems.push(this.items[i]);
          categoriesUsed[this.items[i].categorieId] = true;
        }
      };

    return this;
  },

  save: function(){
    for (var i = 0; i < this.selectedItems.length; i++) {

      var img;
      if(this.selectedItems[i].enclosures && this.selectedItems[i].enclosures[0]){
        //img is often contained in enclosures
        img = this.selectedItems[i].enclosures[0].url;
      }

      var info = {
        title: this.selectedItems[i].title,
        description: this.selectedItems[i].description,
        categorieId: this.selectedItems[i].categorieId,
        link: this.selectedItems[i].link, //non urlencoded
        img: img, //url of image non urlencoded
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

}

module.exports = RssCrawler;
