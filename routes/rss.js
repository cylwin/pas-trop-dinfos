module.exports = function(app){

    var express = require('express');
    var router = express.Router();
    var Info = require(__dirname+'/../models/infos');

    /* GET today best infos. */
    app.get('/rss.xml', function(req, res) {
        console.log("requesting /rss.xml");
        var today = new Date();
        var lastWeek = new Date(today.getTime()-1000*60*60*24*7);

        var categories = [];
        Info.getInfosSince(lastWeek, function(err, infos){
            if(err){
                console.log(err);
                res.send(500, "mongodb query failed");
                return;
            }

            var RSS = require('rss');

            /* lets create an rss feed */
            var feed = new RSS({
                title: 'PTDI RSS feed',
                feed_url: 'http://ptdi.herokuapp.com/rss.xml',
                site_url: 'http://ptdi.herokuapp.com/',
                image_url: 'http://ptdi.herokuapp.com/favicon.ico',
                language: 'fr',
                pubDate:Date.now(),
                ttl: '60'
            });

            for(var i =0;i<infos.length;i++){
                var info = infos[i];
                /* loop over data and add to feed */
                feed.item({
                    title:  info.title,
                    description: info.description,
                    url: info.link, // link to the item
                    date: info.date, // any format that js Date can parse.
                    enclosure: {url:info.img} // optional enclosure
                });
            }

            // cache the xml to send to clients
            var xml = feed.xml();

            res.set('Content-Type', 'text/xml');
            res.send(xml);
        });

    });
};
