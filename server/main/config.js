// 'use strict';

// var express = require('express'),
//  Architect = require('neo4j-architect'),
//  routes = require('./routes'),
//  PORT        = process.env.PORT || 8008;

// // NEO4J_URL = 'http://localhost:' + 7474 ;
  

// // Architect.init();

// module.exports = function (app, subpath) {

  // configure /api/v0 subpath for api versioning
  // subpath.configure(function () {
  //   // just using json for the api
  //   subpath.use(express.json());
  //   subpath.use(express.methodOverride());
  // });

  // app.configure(function () {
  //   // all environments
  //   app.set('port', PORT);
  //   app.use(express.favicon());
  //   app.use(express.logger('dev'));
  //   // just using json for the api
  //   app.use(express.json());
  //   app.use(express.methodOverride());
  //   app.use(app.router);
  //   // development only
  //   if ('development' === app.get('env')) {
  //     app.use(express.errorHandler());
  //   }
  // });


  // routes.api(subpath);
  // routes.swaggerui(app);

  // app.get('/', function(req, res) {
  //   res.redirect('./docs');
  // });


  // app.set('port', PORT);

  // app.use(express.static(__dirname + '/../..'));
// };
