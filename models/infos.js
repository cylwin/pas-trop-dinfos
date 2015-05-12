// /models/user.js
var mongoose = require('mongoose');
var categorie = require(__dirname+'/categories');

// define the schema for our game model
var infoSchema = mongoose.Schema({
    title: String,
    description: String,
    categorieId: Number,
    link: String, //non urlencoded
    img: String, //url of image non urlencoded
    clickCount: Number,
	date: { type: Date, default: Date.now }, //when it's crawled
	twitter : {
		RT: Number, //nb of RT,
		favCount : Number,
		tweetCount : Number
	},
	sentiments : {
		positive : Number, //score between [0,1]
		negative : Number
	},
	score : Number, //it's important to save the computed score because the algorithme may change
	publishDate : Date
});


infoSchema.statics.getInfos = function getInfos(cb) {

    this.find()
        .limit(5)
        .sort('-date')
        .select('_id title categorieId description link img score date')
        .exec(cb);

    return this;
};


infoSchema.statics.getInfosSince = function getInfos(date, cb) {

    var start = new Date(date);

    start.setHours(0,0,0,0);

    this.find({date: {$gte: start}})
        .sort('-date')
        .select('_id title categorieId description link img score')
        .exec(cb);

    return this;
};

infoSchema.statics.groupByCategories = function(infos) {
    var categories = categorie.get().slice(0);
    for (var i = 0; i < infos.length; i++) {
        if(categories[infos[i].categorieId].infos === undefined){
            categories[infos[i].categorieId].infos = [];
        }
        categories[infos[i].categorieId].infos.push(infos[i]);
    }
    return categories;
};

infoSchema.statics.oldArticles = function(index,cb){
    this.find().sort('-date').select('_id title categorieId description link img score date').skip(index*5).limit(5).exec(cb);
    return this;
};

infoSchema.statics.getArticleCount = function(cb){
    this.count(cb);
    return this;
};

// create the model for a game and expose it to our app
module.exports = mongoose.model('Info', infoSchema);
