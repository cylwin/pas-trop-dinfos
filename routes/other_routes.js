module.exports = function(app){

var express = require('express');
var router = express.Router();


/* GET something. */
app.get('/cool_routes/', function(req, res) {
    res.send('respond with a resource');
});

};
