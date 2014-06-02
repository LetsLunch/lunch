'use strict';

module.exports = function (app) {
  app.post('/chat', function(req, res, next) {
    next();
  });
};
