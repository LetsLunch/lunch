'use strict';
var gcm = require('./chat/gcm');
var request = require('request');

var postChat = function(req, res) {
  // Query neo4j for partner's tokens
  var query = 'MATCH (:User {id: {destination}})<-[:PUSH_TO]-(token) ' +
              'RETURN token';
  var params = {
    destination: req.body.destination
  };
  var body = {query: query, params: params};
  console.log(JSON.stringify(body));
  request.post({
    uri: 'http://localhost:7474/db/data/cypher',
    json: body
  }, function(err, r, body) {
    var tokens = [];

    for (var i = 0; i < body.data.length; i++) {
      try {
        if (body.data[i][0].data.type === 'gcm') {
          tokens.push(body.data[i][0].data.token);
        }
      } catch (e) { // Account for weird cypherness
        console.log(e + 'in chat.js');
      }
    }

    // Send chat to all of partner's devices
    var message = new gcm.Message();
    message.addData('message', "Hello, world!");
    message.addData('timestamp', new Date());

    message.delayWhileIdle = true;
    message.timeToLive = 3000;

    gcm.sender.send(message, tokens, 4, function (err, result) {
      console.log('GCMed', err, result);
    });

    res.status(200);
    res.end();
  });
};

module.exports = function (app) {
  app.post('/chat', postChat);
  app.post('/api/v0/chat', postChat);
};
