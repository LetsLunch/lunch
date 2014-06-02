'use strict';

var subpath = require('express')(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    logger  = require('morgan'),
    routes  = require('../main/routes'),
    PORT    = process.env.PORT || 8008,
    API_STRING  = '/api/v0';

module.exports = function(app) {
  // all environments
  app.set('port', PORT);

  // Configure general requests
  if (process.env.DEVELOPMENT) {
    console.info('Morgan is here! (Your DEVELOPMENT variable is set)');
    app.use(logger('dev'));
  }
  app.use(bodyParser());
  app.use(methodOverride());

  // Configure API endpoints
  app.use(API_STRING, subpath);

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
