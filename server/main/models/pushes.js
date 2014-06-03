'use strict';

// ## Module Dependencies
var _ = require('lodash');
var Push = require('./neo4j/push.js');
var Architect = require('neo4j-architect');

Architect.init();

var Construct = Architect.Construct;
var Cypher = Architect.Cypher;

// ## Results Functions
// To be combined with queries using _.partial()

// return a single tag
var _singleTag = function (results, callback) {
  if (results.length) {
    callback(null, new Push(results[0].push));
  } else {
    callback(null, null);
  }
};

// creates the user with cypher
var _create = function (params, callback) {
  console.log('params :->',params);
  var cypherParams = {
    id : params.id,
    token : params.token,
    type : params.type,
  };

  var query = [
    'MERGE (user:User{id:{id}})',
    'WITH user',
    'MERGE (push:Push{token:{token}, type:{type}})',
    'CREATE UNIQUE (user)<-[:PUSH_TO]-(push)',
    'RETURN push',
  ].join('\n');

  console.log('create query', query);

  callback(null, query, cypherParams);
};

// delete the user and any relationships with cypher
var _delete = function (params, callback) {
  var cypherParams = {
    token: params.token
  };

  var query = [
    'MATCH (push:Push {token:{token}})',
    'OPTIONAL MATCH (push)-[r:PUSH_TO]->()',
    'DELETE push, r',
  ].join('\n');

  callback(null, query, cypherParams);
};

var create = new Construct(_create, _singleTag);
var deletePush = new Construct(_delete);

// export exposed functions
module.exports = {
  create: create.done(),
  deletePush: deletePush.done()
};
