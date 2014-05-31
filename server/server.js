'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    logger  = require('morgan'),
    app     = express(),
    subpath = express(),
    // server  = require('http').createServer(app),
    routes  = require('./main/routes'),
    PORT    = process.env.PORT || 8008,
    API_STRING  = '/api/v0';
    // config = require('./main/config');

app.use(API_STRING, subpath);
// just using json for the api
subpath.use(bodyParser());
subpath.use(methodOverride());

// all environments
app.set('port', PORT);

// app.use(favicon());
app.use(logger('dev'));
// just using json for the api
app.use(bodyParser());
app.use(methodOverride());
// app.use(app.router);

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler());
}


routes.api(subpath);
routes.swaggerui(app);

app.get('/', function(req, res) {
  res.redirect('./docs');
});


app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'));
});
