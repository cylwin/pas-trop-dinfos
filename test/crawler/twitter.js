var expect = require("expect.js");
var sinon = require('sinon');
var Twitter = require(__dirname+'/../../crawler/twitter');

describe('twitter', function(){
    var twitter = new Twitter();

    it('should calculate a score', function(){
        expect(twitter.simpleScore(1,2,3)).to.be(3+2+6);
    });

    it('should get populate feed item with twitter analysed data', function(){
        var item = {title : 'super article',
            twitterData: [{
                retweet_count : 3,
                favorite_count : 4
            }, {
                retweet_count : 2,
                favorite_count : 5
            }]};
        twitter.parseTwitterData(item, function(){});
        expect(item.analysedInfos.RT).to.be(5);
        expect(item.analysedInfos.favCount).to.be(9);
        expect(item.analysedInfos.tweetCount).to.be(2);
    });

    it('should call callback after having populated item when parsing twitter data',
        function(done){

        var item = {title : 'super article',
            twitterData: [{
                retweet_count : 3,
                favorite_count : 4
            }, {
                retweet_count : 2,
                favorite_count : 5
            }]};
        twitter.parseTwitterData(item, function(itemCalledBack){
            expect(itemCalledBack.analysedInfos.RT).to.be(5);
            expect(itemCalledBack.analysedInfos.favCount).to.be(9);
            expect(itemCalledBack.analysedInfos.tweetCount).to.be(2);
            done();
        });
    });

});
