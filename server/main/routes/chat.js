'use strict';

var gcm     = require('./chat/gcm'),
    request = require('request'),
    colog   = require('colog');

var pushMessage = function(id, payload) {
  // Define Cypher query for user's tokens
  var query = 'MATCH (:User {id: {id}})<-[:PUSH_TO]-(token:Push) ' +
              'RETURN token';
  var params = { id: id };
  
  // Query neo4j instance
  request.post({
    uri: process.env['NEO4J_URL'] || 'http://localhost:7474/',
    json: { query: query, params: params }
  }, function(err, r, body) {
    //Collect tokens
    var tokens = [];
    for (var i = 0; i < body.data.length; i++) {
      if (body.data[i][0].data.type === 'gcm') {
        tokens.push(body.data[i][0].data.token);
      }
    }

    // Push message to all tokens
    var message = new gcm.Message({
      collapseKey: 'demo',
      delayWhileIdle: true,
      timeToLive: 3,
      data: payload
    });

    gcm.sender.send(message, tokens, 4, function (err) {
      colog.warning('Sent push over GCM: ' + err);
    });
  });

};

var postChat = function(req, res) {
  var destinationId = req.params.destination;
  var payload = {
    message: req.body.message,
    timestamp: req.body.timestamp
  };

  pushMessage(destinationId, payload);

  res.status(200);
  res.end();
};

var match = function(rick, morty) {
  pushMessage(rick, { match: morty });
  pushMessage(morty, { match: rick });
};

module.exports = function (app) {
  // TODO: Integrate into swagger API/docs
  app.post('/chat/:destination', postChat);
  app.post('/api/v0/chat/:destination', postChat);
};

module.exports.match = match;
