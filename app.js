// Chargement du fichier de configuration
var config = require('./config/config');

var express = require('express');
var path = require('path');

//Connect midlewares for passport
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var session = require('express-session');

//Mogodb
var mongoose = require('mongoose');
mongoose.connect(config.db.url);

//Authetification for passport
// var passport = require('passport');
// require('./config/passport')(passport); // pass passport for configuration

//Routes
var routes = require('./routes/index');
// var users = require('./routes/users')(passport);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

// for passport 
// app.use(bodyParser());
// app.use(cookieParser());

// app.use(session({ secret: 'fdsqdfsqfjeiidfa8892JDJDKS'}));
// app.use(passport.initialize());
// app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
require('./routes/other_routes')(app);
//for passport
//require('./routes/other/routes/with/passport')(app, passport);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('The specified resource was not found.');
    err.status = 404;
    next(err);
});


/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
//To start the web server, do "npm start" in this folder.
//Then go with a browser to "localhost:3000"
module.exports = app;