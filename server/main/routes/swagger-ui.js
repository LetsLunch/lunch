'use strict';

// ## Module Dependencies
var path = require('path');
var express = require('express');

var swaggerUIPath = path.resolve(__dirname, '/../../node_modules/neo4j-swagger-ui/dist/');
var handler = express.static(swaggerUIPath);

module.exports = function (app) {
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
};