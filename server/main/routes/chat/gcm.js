'use strict';

var gcm    = require('node-gcm'),
    sender = new gcm.Sender('142933827745');

module.exports = {
  sender: sender,
  Message: gcm.Message
};