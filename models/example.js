// /models/user.js
var mongoose = require('mongoose');

// define the schema for our game model
var exampleSchema = mongoose.Schema({
    name: String,
    content: String,
    shared: { type: Boolean, default: true }
});


// create the model for a game and expose it to our app
module.exports = mongoose.model('Example', exampleSchema);
