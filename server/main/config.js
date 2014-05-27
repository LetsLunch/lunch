var express = require('express');
var Architect = require('neo4j-architect');
NEO4J_URL = "http://localhost:"+7474 ;


Architect.init();

v
module.exports = function (app, server) {
  app.set('port', process.env.PORT || 8008);

  app.use(express.static(__dirname + '/../..'));
};
