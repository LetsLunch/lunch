var express = require('express');

module.exports = function (app, server) {
  app.set('port', process.env.PORT || 8008);

  app.use(express.static(__dirname + '/../..'));
};
