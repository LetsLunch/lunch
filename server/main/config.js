'use strict';

var subpath        = require('express')(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    logger         = require('morgan'),
    routes         = require('../main/routes'),
    colog          = require('colog'),
    PORT           = process.env.PORT || 8008,
    BASE_URL       = process.env.BASE_URL || 'http://localhost:' + PORT,
    API_STRING     = '/api/v0';

var allowCORS = function(req, res, next) {
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Origin', '*');
  next();
};

module.exports = function(app) {
  // all environments
  app.set('port', PORT);

  // Configure general requests
  if (process.env.DEVELOPMENT) {
    console.info('Morgan is here! (Your DEVELOPMENT variable is set)');
    app.use(logger('dev'));
    colog.silent(false);
  } else {
    colog.silent(true);
  }
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(allowCORS);

  // Configure API endpoints
  app.use(API_STRING, subpath);

  // API endpoint routes
  routes.api(subpath, BASE_URL, PORT, API_STRING);
  // API documentation routes
  routes.swaggerui(app);
  // Use documentation as landing page
  app.get('/', function(req, res) {
    res.redirect('./docs');
  });
  // TODO: make landing page
};
