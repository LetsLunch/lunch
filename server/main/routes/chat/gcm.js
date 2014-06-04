'use strict';

var gcm    = require('node-gcm'),
    sender = new gcm.Sender(process.env.GCM_KEY);

module.exports = {
  sender: sender,
  Message: gcm.Message
};