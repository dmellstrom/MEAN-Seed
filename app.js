/*

  There are some minor modifications to the default Express setup
  Each is commented and marked with [SH] to make them easy to find

 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// [SH] Require Passport
var passport = require('passport');

// [SH] Bring in the data model
require('./app_api/models/db');
// [SH] Bring in the Passport config after model is defined
require('./app_api/config/passport');


// [SH] Bring in the routes for the API (delete the default routes)
var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// [SH] Set the app_client folder to serve static resources
app.use(express.static(path.join(__dirname, 'app_client')));

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

// [SH] Use the API routes when path starts with /api
app.use('/api', routesApi);

// [SH] Otherwise render the index.html page for the Angular SPA
// [SH] This means we don't have to map all of the SPA routes in Express
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch errors
app.use(function (err, req, res, next) {
  res.status(err.status);
  res.json({message: err.name + ': ' + err.message})
  console.error(err.stack);
});

module.exports = app;
