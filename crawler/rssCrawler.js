
  /*!
 * This is a node-feedparser example
 * 
 */
var Twit = require('twit');
var async = require('async');
var FeedParser = require('feedparser')
  , fs = require('fs')
  //, feed = 'le_monde_science.xml';
  , feed = 'figaro_economie.xml';

var T = new Twit({ //don't try it's fake id :-D
    consumer_key:         'zvXaVn4jZ6Kx5jrsIk769Hb9gV'
  , consumer_secret:      'sDuBR4ndQ6X9qIgFkfwHdOkI52JLBzbmqG5W3zNTFMha2u5LV1q'
  , access_token:         'T2384827184-qRIWyOsmrPYooELlo0idhbkQQJP2wnf19u2kVRt'
  , access_token_secret:  'xZAOgyb6IYHXNFiTrkV6itwxp98pyfu4HpgMfKkVR1Yl2I'
});

var items = [];


fs.createReadStream(feed)
  .on('error', function (error) {
    console.error(error);
  })
  .pipe(new FeedParser())
  .on('error', function (error) {
    console.error(error);
  })
  .on('meta', function (meta) {
    console.log('===== %s =====', meta.title);
  })
  .on('readable', function() {
    var stream = this, item;
    while (item = stream.read()) {
      items.push(item);
    }
  })
  .on('end', endCallback);

  function endCallback(){

    items.forEach(function(item){
      console.log(item.link);
      T.get('search/tweets', { q: encodeURI(item.link), count: 100 }, function(err, data, response) {
        if(err){
          console.log("err : " + err);
          return;
        }
        var RT = 0;
        var favCount = 0;
        for (var i = 0; i < data.statuses.length; i++) {
          RT += data.statuses[i].retweet_count;
          favCount += data.statuses[i].favorite_count;
        };
        var score = RT*3+favCount+data.statuses.length*2;
        console.log('RT : %s, fav : %s, score : %s, nb: %s, article: %s', RT,favCount, score, data.statuses.length, item.title);
      });
    });


  }