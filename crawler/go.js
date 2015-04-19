var config = require(__dirname+'/../config/config');
var mongoose = require('mongoose');
mongoose.connect(config.db.url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var RssCrawler = require(__dirname+'/rssCrawler');
var rssCrawler = new RssCrawler(mongoose);

var feeds = require(__dirname+'/feeds.json');

rssCrawler.crawl(feeds);
