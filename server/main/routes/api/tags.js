'use strict';

// ## Module Dependencies
var _ = require('lodash');
var sw = require('swagger-node-express');
var utils = require('../../utils');

// ## Models
var Tags = require('../../models/tags');

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

// Route: GET '/tags'
exports.list = {

  spec: {
    description : 'List all tags',
    path : '/tags',
    method: 'GET',
    summary : 'Find all tags',
    notes : 'Returns all tags',
    type: 'object',
    items: {
      $ref: 'Tag'
    },
    produces: ['application/json'],
    parameters : [],
    responseMessages: [swe.notFound('tags')],
    nickname : 'getTags'
  },

  action: function (req, res) {
    var options = {};
    var errLabel = 'Route: GET /tags';
    var callback = _.partial(_callback, res, errLabel);
    
    options.neo4j = utils.existsInQuery(req, 'neo4j');

    Tags.getAll(null, options, callback);
  }
};


// Route: POST '/tags'
exports.addTag = {
  
  spec: {
    path : '/tags',
    notes : 'adds a tag to the graph',
    summary : 'Add a new tag to the graph',
    method: 'POST',
    type : 'object',
    items : {
      $ref: 'Tag'
    },
    parameters : [
      param.form('userId', 'User UUID', 'string', true),
      param.form('id', 'tag UUID', 'string', true),
      param.form('name', 'tag name', 'string', true),
     ],
    responseMessages : [swe.invalid('input')],
    nickname : 'addTag'
  },

  action: function(req, res) {
    var options = {};
    var params = {};
    var errLabel = 'Route: POST /tags';
    var callback = _.partial(_callback, res, errLabel);

    options.neo4j = utils.existsInQuery(req, 'neo4j');
    params = _prepareParams(req);
    // Check for params 
    console.log("addTag params:-",params);
    Tags.create(params, options, callback);

  }
};

// // Route: DELETE '/tags/:id'
exports.deleteTagRelation = {

  spec: {
    path: '/tags/{id}',
    notes: 'Deletes an existing user and Tag relationships',
    summary: 'Delete a  user and tag relationships',
    method: 'DELETE',
    type: 'object',
    parameters: [
      param.path('id', 'ID of tag to be deleted', 'string'),
      param.form('userId', 'User Id', 'string', true),

    ],
    responseMessages: [swe.invalid('input')],
    nickname : 'deleteTagRelation'
  },

  action: function (req, res) {
    var id = req.params.id;
    var options = {};
    var params = {};

    if (!id) throw swe.invalid('id');

    var errLabel = 'Route: DELETE /tags/{id}';
    var callback = _.partial(_callback, res, errLabel);

    options.neo4j = utils.existsInQuery(req, 'neo4j');
    params = _prepareParams(req);

    Tags.deleteTagRelation(params, options, callback);
  }
};
