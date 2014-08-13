var config = require('../config/config');
var mongoose = require('mongoose');
mongoose.connect(config.db.url);

var RssCrawler = require('./rssCrawler');
var rssCrawler = new RssCrawler();

var feeds = [];
// feeds[catId] = [links]
feeds[0] = ["http://syndication.lesechos.fr/rss/rss_tech_medias.xml", "http://www.leparisien.fr/high-tech/rss.xml", "http://www.lefigaro.fr/rss/figaro_sciences.xml"];
// , "http://www.leparisien.fr/high-tech/rss.xml", "http://www.lefigaro.fr/rss/figaro_hightech.xml", 
feeds[1] = ["http://www.lexpress.fr/rss/politique.xml", "http://syndication.lesechos.fr/rss/rss_politique.xml", "http://www.lemonde.fr/emploi/rss_full.xml"];
// "http://rss.liberation.fr/rss/13/", "http://rss.liberation.fr/rss/11/", 
feeds[2] = ["http://www.lexpress.fr/rss/sport.xml", "http://www.lequipe.fr/rss/actu_rss.xml"];
// , "http://rss.liberation.fr/rss/14/"
feeds[3] = ["http://www.lexpress.fr/rss/science-et-sante.xml", "http://www.lemonde.fr/sante/rss_full.xml"];
feeds[4] = ["http://www.lepoint.fr/monde/rss.xml", "http://www.lemonde.fr/international/rss_full.xml"];


var formatedFeedsList = [];

for (var i = 0; i < feeds.length; i++) {
	for (var j = 0; j < feeds[i].length; j++) {
		feeds[i][j]
		formatedFeedsList.push({feedUrl : feeds[i][j], categorieId : i});
	};
};
//console.log(formatedFeedsList);
rssCrawler.crawl(formatedFeedsList);
//rssCrawler.crawl([{feedUrl : "abc", categorieId : 1}]);