'use strict';

// ## Module Dependencies
var _ = require('lodash');
var sw = require('swagger-node-express');
var utils = require('../../utils');

// ## Models
var Pushes = require('../../models/pushes');

var param = sw.params;
var swe = sw.errors;

var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(
    process.env['NEO4J_URL'] ||
    'http://localhost:7474'
);


// ## Helpers
var _prepareParams = function (req) {
  var params = req.body;

  params.id = req.params.id || req.body.id;

  return params;
};

// callback helper function
// 
// This is meant to be bound to a new function within the endpoint request callback
// using _partial(). The first two parameters should be provided by the request callback 
// for the endpoint this is being used in.
//
// Example:
//
// action: function(req, res) {
//   var errLabel = 'Route: POST /tags';
//   var callback = _.partial(_callback, res, errLabel);
// }
var _callback = function (res, errLabel, err, results, queries) {
  var start = new Date();

  if (err || !results) {
    if (err) console.error(errLabel + ' ', err);
    swe.invalid('input', res);
    return;
  }

  utils.writeResponse(res, results, queries, start);
};


// ## API Specs

// Route: POST '/tags'
exports.addPush = {
  
  spec: {
    path : '/pushes',
    notes : 'Adds a push notification token to the graph',
    summary : 'Add a new push notification token to the graph',
    method: 'POST',
    type : 'object',
    items : {
      $ref: 'Push'
    },
    parameters : [
      param.form('id', 'User UUID', 'string', true),
      param.form('token', 'Push notification token', 'string', true),
      param.form('type', 'Service type (gcm/apn)', 'string', true),
     ],
    responseMessages : [],
    nickname : 'addPush'
  },

  action: function(req, res) {
    var options = {};
    var params = {};
    var errLabel = 'Route: POST /pushes';
    var callback = _.partial(_callback, res, errLabel);

    options.neo4j = utils.existsInQuery(req, 'neo4j');
    params = _prepareParams(req);
    // Check for params 
    console.log('addPush params:-' + params);
    Pushes.create(params, options, callback);

  }
};

// // Route: DELETE '/tags/:id'
exports.deletePush = {

  spec: {
    path: '/tags/{token}',
    notes: 'Deletes an existing push notification token and its relationship',
    summary: 'Delete a push notification token and its relationship',
    method: 'DELETE',
    type: 'object',
    parameters: [
      param.path('token', 'Push notification token to be deleted', 'string', true)

    ],
    responseMessages: [],
    nickname : 'deleteTagRelation'
  },

  action: function (req, res) {
    var token = req.params.token;
    var options = {};
    var params = {};

    var errLabel = 'Route: DELETE /tags/{id}';
    var callback = _.partial(_callback, res, errLabel);

    options.neo4j = utils.existsInQuery(req, 'neo4j');
    params = _prepareParams(req);

    Pushes.deletePush(params, options, callback);
  }
};
