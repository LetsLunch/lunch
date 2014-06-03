'use strict';

var gcm     = require('./chat/gcm'),
    request = require('request'),
    colog   = require('colog');

var postChat = function(req, res) {
  // Query neo4j for partner's tokens
  var query = 'MATCH (:User {id: {destination}})<-[:PUSH_TO]-(token) ' +
              'RETURN token';
  var params = {
    destination: req.params.destination
  };
  
  request.post({
    uri: 'http://localhost:7474/db/data/cypher',
    json: {query: query, params: params}
  }, function(err, r, body) {
    // Collect partner's tokens
    var tokens = [];
    for (var i = 0; i < body.data.length; i++) {
      if (body.data[i][0].data.type === 'gcm') {
        tokens.push(body.data[i][0].data.token);
      }
    }

    // Send chat to all of partner's tokened devices
    var message = new gcm.Message({
      collapseKey: 'demo',
      delayWhileIdle: true,
      timeToLive: 3,
      data: {
        message: req.body.message,
        timestamp: req.body.timestamp
      }
    });
    gcm.sender.send(message, tokens, 4, function (err) {
      colog.warning('Sent push over GCM: ' + err);
    });

    res.status(200);
    res.end();
  });
};

module.exports = function (app) {
  // TODO: Integrate into swagger API/docs
  app.post('/chat/:destination', postChat);
  app.post('/api/v0/chat/:destination', postChat);
};
