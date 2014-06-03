'use strict';

// ## Module Dependencies
var _ = require('lodash');
var User = require('./neo4j/user.js');
var zipcoder = require('cities');
var Architect = require('neo4j-architect');
var colog = require('colog');

Architect.init();

var Construct = Architect.Construct;
var Cypher = Architect.Cypher;

// ## Results Functions
// To be combined with queries using _.partial()
// return a single user

var _singleUser = function (results, callback) {
  if (results.length) {
    callback(null, new User(results[0].user));
  } else {
    callback(null, null);
  }
};

// return many users
var _manyUsers = function (results, callback) {
  var users = _.map(results, function (result) {
    return new User(result.results);
  });

  callback(null, users);
};


// ## Query Functions
// Should be combined with results functions using _.partial()

// find location of UserId with cypher
var _findAllMatches = function (params, callback) {
  colog.info(params);
  var cypherParams = {
    userId : params.id,
  };

  var query = [
    'MATCH (u:User{id:{userId}})-[:IS_AT]->(loc)<-[:IS_AT]-(o:User)',
      'WHERE u <> o',
      'WITH u ,o ',
      'MATCH (u)-[:HAS_TAG]->(t)<-[:HAS_TAG]-(o)',
      'WITH count(DISTINCT t) as cntt,o',
    'RETURN o as results',
    'ORDER BY cntt DESC',
    'UNION',
    'MATCH (u:User{id:{userId}})-[:IS_AT]->(loc)<-[:IS_AT]-(o:User)',
      'WHERE u <> o',
      'WITH u ,o ',
      'MATCH (u)-[:LIKES]->(l)<-[:LIKES]-(o)',
      'WHERE u <> o',
      'WITH u,o,count(DISTINCT l) as cntlike',
    'RETURN o as results',
    'ORDER BY cntlike DESC',
    'UNION',
    'MATCH (u:User{id:{userId}})-[:IS_AT]->(loc)<-[:IS_AT]-(o:User)',
      'WHERE u <> o',
    'RETURN o as results',
  ].join('\n');

  colog.log('create query', query);

  callback(null, query, cypherParams);
};

var _selected = function (params, callback) {
  var cypherParams = {
    userId : params.userId,
    selectedUserId : params.selectedUserId,
  };

  var query = [
    'MATCH (user:User{id:{userId}})-[:SELECTED]->(selectedUser:User{id:{selectedUserId}})',
     'RETURN selectedUser'
  ].join('\n');

  colog.info('create query', query);

  callback(null, query, cypherParams);
};



// create a new user

var findAllMatches = new Construct(_findAllMatches, _manyUsers);

var userSelected = new Construct(_selected, _singleUser);

// export exposed functions
module.exports = {
  getAll: findAllMatches.done(),
  userSelected: userSelected.done(),
};
