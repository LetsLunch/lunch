'use strict';

module.exports = function (app) {
  app.post('/chat', function(req, res, next) {
    // TODO:
    //  get partner token from uuid
    
    //  send chat to partner via push
    next();
  });
};
