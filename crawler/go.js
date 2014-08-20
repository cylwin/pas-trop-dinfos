var config = require('../config/config');
var mongoose = require('mongoose');
mongoose.connect(config.db.url);

var RssCrawler = require('./rssCrawler');
var rssCrawler = new RssCrawler();

var feeds = require('./feeds.json');

rssCrawler.crawl(feeds);