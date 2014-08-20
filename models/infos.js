// /models/user.js
var mongoose = require('mongoose');

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


// create the model for a game and expose it to our app
module.exports = mongoose.model('Info', infoSchema);
