'use strict';

// ## Module Dependencies
var _ = require('lodash');
var sw = require('swagger-node-express');
var utils = require('../../utils');
var colog = require('colog');
// ## Models
var Match = require('../../models/match');

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

  params = _.extend(params,req.params);

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
    if (err) colog.error(errLabel + ': ' + err);
    swe.invalid('input', res);
    return;
  }

  utils.writeResponse(res, results, queries, start);
};


// ## API Specs

// Route: GET '/match'
exports.getMatch = {

  spec: {
    description : 'List all Match users',
    path : '/match/{id}',
    method: 'GET',
    summary : 'Find all match users',
    notes : 'Returns all match users',
    type: 'object',
    items: {
      $ref: 'User'
    },
    produces: ['application/json'],
    parameters : [
      param.path('id', 'User Id', 'string'),
    ],
    responseMessages: [swe.notFound('Match')],
    nickname : 'getMatch'
  },

  action: function (req, res) {
    var options = {};
    var errLabel = 'Route: GET /match/{userId}';
    var params = {};
    var callback = _.partial(_callback, res, errLabel);
    
    options.neo4j = utils.existsInQuery(req, 'neo4j');
    params = _prepareParams(req);
    colog.info(params);

    Match.getAll(params, options, callback);
  }
};


// Route: POST '/match/{userId}'
exports.userSelected = {
  
  spec: {
    path : '/match/{id}',
    notes : 'posts the selected user is accepted or rejected',
    summary : 'Add accepted/ rejected relationships to the graph',
    method: 'POST',
    type : 'object',
    items : {
      $ref: 'User'
    },
    parameters : [
      param.path('id', 'User Id', 'string'),
      param.form('selectedUserId', 'Selected User Id', 'string', true),
      param.form('accepted', 'is the selected user Accepted ', 'string', true),

    ],
    responseMessages : [swe.invalid('input')],
    nickname : 'userSelected'
  },

  action: function(req, res) {
    var options = {};
    var params = {};
    var errLabel = 'Route: POST /match/{id}';
    var callback = _.partial(_callback, res, errLabel);

    options.neo4j = utils.existsInQuery(req, 'neo4j');
    params = _prepareParams(req);
    // Check for params 
    Match.userSelected(params, options, callback);

  }
};
