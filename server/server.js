// 'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    favicon  = require('serve-favicon'),
    errorHandler = require('errorhandler'),
    logger  = require('morgan'),
    app     = express(),
    subpath = express(),
    server  = require('http').createServer(app),
    routes  = require('./main/routes'),
    PORT    = process.env.PORT || 8008,
    API_STRING  = '/api/v0';
    // config = require('./main/config');

app.use(API_STRING, subpath);
// console.log(subpath)
// console.log('app :',app);
// subpath.configure(function () {
  // just using json for the api
  subpath.use(bodyParser.json());
  subpath.use(methodOverride());
// });

// app.configure(function () {
  // all environments
  app.set('port', PORT);
 
  // app.use(favicon());
 
  app.use(logger('dev'));
  // just using json for the api
  app.use(bodyParser.json());
  app.use(methodOverride());
  // app.use(app.router);
  // development only
  if ('development' === app.get('env')) {
    app.use(errorHandler());
  }
// });
 routes.api(subpath);
  //routes.swaggerui(app);
 
  app.get('/', function(req, res) {
    res.redirect('./docs');
  });



var path = require('path');

var swaggerUIPath = path.resolve(__dirname, '../node_modules/neo4j-swagger-ui/dist');
var handler = express.static(swaggerUIPath);

// module.exports = function (app) {
   console.log(swaggerUIPath);
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



 
  



// config(app, subpath);

app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'));
});




// 'use strict';

// // ## Module dependencies
// var express = require('express')
//   , http = require('http');

// var Config = require('./config/index.js')
//   , log = require('./utils/logger')
//   , middleware = require('./middleware')
//   , routes = require('./app/routes');

// var cfg = new Config().getSync();

// // Initializes the main server and api server (subpath)
// var server = express();
// var subpath = express();

// log.info('Using configurations for ' + process.env.NODE_ENV);
// log.info('Configurations loaded... initializing the server');

// // configure /api path for api versioning and setup to only serve json
// server.use(cfg.server.apiBasePath, subpath);
// subpath.configure(function () {
  
//   // just using json for the api
//   subpath.use(express.json());
//   subpath.use(express.urlencoded());
  
//   subpath.use(express.methodOverride());
// });

// // ## Middlesware
// middleware(server, cfg);

// // ## Initialize Routes
// routes.auth(server, cfg);
// routes.api(subpath, cfg);
// routes.swaggerui(server);

// // Forward remaining requests to index
// server.all('/*', function (req, res) {
//   res.sendfile('index.html', {root: server.get('views')});
// });

// // Start the server
// server.set('port', cfg.server.port);
// http.createServer(server).listen(server.get('port'), function () {
//   log.info('Express server listening on port ' + server.get('port'));
// });

// module.exports = server;