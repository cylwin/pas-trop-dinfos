var config = require('../config/config');
var mongoose = require('mongoose');
mongoose.connect(config.db.url);

var RssCrawler = require('./rssCrawler');
var rssCrawler = new RssCrawler();

var feeds = [];
// feeds[catId] = [links]
feeds[0] = ["http://syndication.lesechos.fr/rss/rss_tech_medias.xml", "http://www.leparisien.fr/high-tech/rss.xml", "http://www.lefigaro.fr/rss/figaro_hightech.xml", "http://www.lefigaro.fr/rss/figaro_sciences.xml"];
feeds[1] = ["http://rss.liberation.fr/rss/13/", "http://rss.liberation.fr/rss/11/", "http://www.lexpress.fr/rss/politique.xml", "http://www.leparisien.fr/economie/rss.xml"];
feeds[2] = ["http://rss.liberation.fr/rss/14/", "http://www.lexpress.fr/rss/sport.xml "];
feeds[3] = ["http://www.lexpress.fr/rss/science-et-sante.xml", "http://www.lefigaro.fr/rss/figaro_sante.xml", "http://www.lefigaro.fr/rss/figaro_sport.xml"];
feeds[4] = ["http://rss.liberation.fr/rss/10/", "http://www.lefigaro.fr/rss/figaro_international.xml", "http://www.lepoint.fr/monde/rss.xml"];

var formatedFeedsList = [];

for (var i = 0; i < feeds.length; i++) {
	for (var j = 0; j < feeds[i].length; j++) {
		feeds[i][j]
		formatedFeedsList.push({feedUrl : feeds[i][j], categorieId : i});
	};
};

rssCrawler.crawl(formatedFeedsList);
