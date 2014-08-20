module.exports = function(app){

var express = require('express');
var router = express.Router();
var Categorie = require(__dirname+'/../models/categories');
var Info = require(__dirname+'/../models/infos');

/* GET today best infos. */
app.get('/infos', function(req, res) {

    Info.find()
        .limit(5)
        .sort('-date')
        .select('_id title categorieId description link img score')
        .exec(function(err, data){
            if(err){
                console.log(err);
                res.send(500, "mongodb querie failed");
                return;
            }
            var categorie = new Categorie();
            var categories = categorie.get();
            for (var i = 0; i < data.length; i++) {
                if(categories[data[i].categorieId].infos === undefined){
                    categories[data[i].categorieId].infos = [];
                }
                categories[data[i].categorieId].infos.push(data[i]);
                console.log(data[i].title);
            }
            res.send({categories : categories});
        });
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
