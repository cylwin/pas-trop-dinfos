var config = require(__dirname+'/../config/config');
var mongoose = require('mongoose');

var timeout = 6*60*60*1000;

var crawl = function(){
    mongoose.connect(config.db.url);

    var RssCrawler = require(__dirname+'/rssCrawler');
    var rssCrawler = new RssCrawler();

    var feeds = require(__dirname+'/feeds.json');

    rssCrawler.crawl(feeds);
};

setInterval(crawl,timeout);
crawl();
