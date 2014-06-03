'use strict';

// ## Module Dependencies
var path = require('path');
var express = require('express');

var swaggerUIPath = path.resolve(__dirname, '../../../node_modules/neo4j-swagger-ui/dist/');
var handler = express.static(swaggerUIPath);

module.exports = function (app) {
  // this loads api specs (json) available at the endpoint defined
  // through swagger.configureSwaggerPaths. By default this is
  // api-docs.
  app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
    if (req.url === '/docs') {
      // express static barfs on root url w/o trailing slash
      res.writeHead(302, { 'Location' : req.url + '/' });
      res.end();
      return;
    }

    // take off leading /docs so that connect locates file correctly
    req.url = req.url.substr('/docs'.length);
    return handler(req, res, next);
  });
};
