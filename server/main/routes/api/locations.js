'use strict';

// ## Module Dependencies
var _ = require('lodash');
var sw = require('swagger-node-express');
var utils = require('../../utils');

// ## Models
var Locations = require('../../models/locations');

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
  console.log('in locations');
  console.log(req.body);
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
//   var errLabel = 'Route: POST /likes';
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

// Route: GET '/locations/userId'
exports.find = {

  spec: {
    description : 'Location of user',
    path : '/locations/{userId}',
    method: 'GET',
    summary : 'Find location of User',
    notes : 'Returns location of user',
    type: 'object',
    items: {
      $ref: 'Location'
    },
    produces: ['application/json'],
    parameters : [
      param.path('userId', 'User Id', 'string'),
    ],
    responseMessages: [swe.notFound('location')],
    nickname : 'getLocation'
  },

  action: function (req, res) {
    var options = {};
    var errLabel = 'Route: GET /locations/{userId}';
    var params = {};
    var callback = _.partial(_callback, res, errLabel);
    
    options.neo4j = utils.existsInQuery(req, 'neo4j');
    params = req.params;
    Locations.find(params, options, callback);
  }
};


// Route: POST '/locations'
exports.addLocation = {
  
  spec: {
    path : '/locations',
    notes : 'adds a location to the graph',
    summary : 'Add a new location to the graph',
    method: 'POST',
    type : 'object',
    items : {
      $ref: 'Location'
    },
    parameters : [
      param.form('userId', 'User UUID', 'string', true),
      param.form('lat', 'Latitude', 'string', true),
      param.form('lng', 'Longitude', 'string', true),
     ],
    responseMessages : [swe.invalid('input')],
    nickname : 'addLoction'
  },

  action: function(req, res) {
    var options = {};
    var params = {};
    var errLabel = 'Route: POST /locations';
    var callback = _.partial(_callback, res, errLabel);

    options.neo4j = utils.existsInQuery(req, 'neo4j');
    params = _prepareParams(req);
    // Check for params 
    // console.log("addLocation req:-",req);
    Locations.create(params, options, callback);

  }
};

