'use strict';

// Module Dependencies
var api       = require('./api'),
    swaggerui = require('./swagger-ui'),
    chat      = require('./chat');
//  auth      = require('./auth');

module.exports = {
  api: api,
  swaggerui: swaggerui,
  chat: chat
//auth: auth
};
