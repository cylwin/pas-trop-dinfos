module.exports = function(app){

var express = require('express');
var router = express.Router();
var Categorie = require(__dirname+'/../models/categories');
var Info = require(__dirname+'/../models/infos');

/* GET today best infos. */
app.get('/infos', function(req, res) {

    if(!req.date){
        req.date = new Date();
    }

    var categories = [];
    Info.getInfos(req.date, function(err, infos){
        if(err){
            console.log(err);
            res.send(500, "mongodb querie failed");
            return;
        }
        categories = Info.groupByCategories(infos);
        res.send({categories : categories});
    })

});

app.get('/infos/click', function(req, res) {
        if(!req.query._id){
            res.send(400); //TODO check this code
            return;
        }
        Info.findOne({_id : req.query._id}, function(err, info){
            if(err){ return; }
            info.clickCount++;
            info.save();
        })
    res.send(200);
});

};
