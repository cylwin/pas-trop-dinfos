module.exports = function(app){
var  cat = require(__dirname+'/../models/categories');

var Info = require(__dirname+'/../models/infos');

/* GET today best infos. */
app.get('/infos', function(req, res) {

    //console.log(new Date(req.query.date));

    var categories = [];
    Info.getInfos( function(err, infos){
        if(err){
            console.log(err);
            res.send(500, "mongodb querie failed");
            return;
        }
        categories = Info.groupByCategories(infos);
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

app.get('/infos/:id', function(req,res, next){
    Info.findOne({_id:req.params.id}, function(err,info){
        if(err)
            return next(err);
        info = info.toJSON();
        info.categorieName = cat.get(info.categorieId).name;
        res.send(info);
    });
    // res.send(200);
});

app.get('/page/count', function(req,res, next){
    Info.getArticleCount(function(err,info){
        if(err){
            console.log(err);
            res.send(500, "mongodb querie failed");
            return;
        }
        //console.log(info);
        res.send({count:info});
    });
});

app.get('/page/:id',function(req,res,next){
    var categories = [];
    Info.oldArticles(req.params.id, function(err, infos){
        if(err){
            console.log(err);
            res.send(500, "mongodb querie failed");
            return;
        }
        
        categories = Info.groupByCategories(infos);
        res.send({categories : categories});
    });
});


};
