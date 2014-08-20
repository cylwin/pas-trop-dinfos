var Twit = require('twit');
var RateLimiter = require('limiter').RateLimiter;


var Twitter = function () {
  this.init();
}

Twitter.prototype = {

 /**
  * Constructor
  * @return {Twitter} this
  */
  init:function(){
	  this.T = new Twit({ //don't try it's fake id :-D
	  	consumer_key: 'vXaVn4jZ6Kx5jrsIk769Hb9gV',
	  	consumer_secret: 'DuBR4ndQ6X9qIgFkfwHdOkI52JLBzbmqG5W3zNTFMha2u5LV1q',
	  	access_token: '2384827184-qRIWyOsmrPYooELlo0idhbkQQJP2wnf19u2kVRt',
	  	access_token_secret: 'ZAOgyb6IYHXNFiTrkV6itwxp98pyfu4HpgMfKkVR1Yl2I'
	  });
    
    this.limiter = new RateLimiter(11, 60*1000); //165 req every 15 min (max 180)
	}, 

	/**
	 * (async) call twitter api and the analyse result for each feedItem
	 * @param  {Array} feedItems 	array of objects with properties : categorieId, title, description, link
	 * @return {Twitter}         	this
	 */
  getTweets: function(feedItems, callbackSuccess, callbackError){ //rempli les item.twitterData
    var self = this;

    feedItems.forEach(function(item){
      self.limiter.removeTokens(1, function(err, remainingRequests) {
         self.search(item.link, item, callbackSuccess, callbackError);
      });
    });
  	return this;
  },


	/**
	* (async) interogate twitter search api
	* @param  {String} url     the link to serach on twitter
	* @param  {Object} item    the function fill item.twitterData
	* @return {rssCrawler}     this
	*/
	search: function(url, item, callbackSucess, callbackErr){
		var self = this;
		if(!item){
			console.error("err : item is undefined : url : ", url);
			callbackErr();
			return this;
		}
		if(item.twitterData){
			console.error("err : item  already crawled : url : ", url);
			callbackErr()
			return this;
		}

		this.T.get('search/tweets', { q: encodeURI(url), count: 100 },
			function(err, data, response) {
				if(err){
					console.error(err);
					callbackErr(); //todo, try again with this item
				}
				item.twitterData = data.statuses;
		    self.parseTwitterData.bind(self)(item, callbackSucess);

		});
		return this;
	},

  /**
   * analyse twitter search api result in order to calculate a score
   * @param  {Object} item 			item to hidrate with calculated datas
   * @param {function} callback call at the end
   * @return {Twitter}      		this
   */
  parseTwitterData: function(item, callback){
    var RT = 0;
    var favCount = 0;
    for (var i = 0; i < item.twitterData.length; i++) {
      RT += item.twitterData[i].retweet_count;
      favCount += item.twitterData[i].favorite_count;
    };
    item.analysedInfos = {RT : RT, favCount : favCount, tweetCount : item.twitterData.length};
    item.analysedInfos.score = this.simpleScore(RT, favCount, item.twitterData.length);

    this.printInfos(RT, favCount, item.analysedInfos.score, item.twitterData.length, item.title);

		callback();
    
    return this;
  },

  /**
   * print analysed twitter data
   * @param  {number} RT       number of retweet
   * @param  {number} favCount number of favorite
   * @param  {number} score    calculated score
   * @param  {number} nb       number of tweets
   * @param  {String} title    title of the article
   * @return {Twitter}         this
   */
  printInfos: function(RT, favCount, score, nb, title){
    console.log('RT : '+RT+',\tfav : '+favCount+',\tscore : '+score+',\tnb: '+nb+',\tarticle: '+title);
    return this;
  },

  /**
   * calculate the social score
   * @param  {integer} RT         Number of retweet
   * @param  {integer} favCount   Number of twitter favorite
   * @param  {integer} tweetCount Number of tweet
   * @return {integer}            score
   */
  simpleScore: function(RT, favCount, tweetCount){
    var score = RT*3 + favCount + tweetCount*2;
    return score;
  }

};

module.exports = Twitter;