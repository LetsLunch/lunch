'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    // favicon  = require('serve-favicon'),
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
 
app.get('/', function(req, res) {
  res.redirect('./docs');
});



var path = require('path');

var swaggerUIPath = path.resolve(__dirname, '../node_modules/neo4j-swagger-ui/dist');
var handler = express.static(swaggerUIPath);

// this loads api specs (json) available at the endpoint defined
// through swagger.configureSwaggerPaths. By default this is
// api-docs. I don't think this can be easily changed.
app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
  console.log(req.url);
  if (req.url === '/docs') {
    console.log('im here ..');
    // express static barfs on root url w/o trailing slash
    res.writeHead(302, { 'Location' : req.url + '/' });
    res.end();
    return;
  }

  // take off leading /docs so that connect locates file correctly
  req.url = req.url.substr('/docs'.length);
  console.log("req.url :",req.url);
  return handler(req, res, next);
});




app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'));
});



