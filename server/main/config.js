'use strict';

var subpath = require('express')(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    logger  = require('morgan'),
    routes  = require('../main/routes'),
    PORT    = process.env.PORT || 8008,
    API_STRING  = '/api/v0';

module.exports = function(app) {
  // all environments
  app.set('port', PORT);

  // Configure API endpoints
  app.use(API_STRING, subpath);
  subpath.use(bodyParser());
  subpath.use(methodOverride());

  // Configure general requests
  app.use(logger('dev'));
  app.use(bodyParser());
  app.use(methodOverride());

  // development only
  if ('development' === app.get('env')) {
    app.use(errorHandler());
  }

  // API endpoint routes
  routes.api(subpath);
  // API documentation routes
  routes.swaggerui(app);
  // Use documentation as landing page
  app.get('/', function(req, res) {
    res.redirect('./docs');
  });
  // TODO: make landing page
};
