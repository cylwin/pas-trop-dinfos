/**
 * Created by Raphael on 18/04/2015.
 */

var config = require(__dirname+'/../config/config');
var mongoose = require('mongoose');
mongoose.connect(config.db.url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Info=require("../models/infos");

db.once('open', function (callback) {
    var date = new Date();
    date.setMonth(01,01);

    console.log("test");
    var test=new Info({
        title: 'test',
        description: 'abc',
        categorieId: 1
    });

    test.save(function(err,info){
        console.log(err);
        console.log(info);

        Info.getInfosSince(Date.now(), function(err, infos){
            if(err){
                console.log(err);
                res.send(500, "mongodb querie failed");
                return;
            }
            console.log(infos);
        });
    });

});

