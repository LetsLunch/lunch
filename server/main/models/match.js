'use strict';

// ## Module Dependencies
var _ = require('lodash');
var User = require('./neo4j/user.js');
var UserProfile = require('./neo4j/userprofile.js');
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

var _singleUserProfile = function (results, callback) {
  if (results.length) {
    callback(null, new UserProfile(results[0]));
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
  var date =  new Date(Date.now());
  var cypherParams = {
    userId : params.id,
    date : date.toDateString()
  };

  var query = [
  'MERGE (today:Date{id:{date}})',
  'WITH today',
  'MATCH (u:User{id:{userId}})-[:IS_AT]->(loc:Location)<-[:IS_AT]-(o:User)',
  'WITH u, o,today',
  'MATCH (u:User)-[r1:LIKES|HAS_TAG]->(l)<-[r2:LIKES|HAS_TAG]-(o:User)',
  'WHERE NOT (u)-[:REJECT]-(o) AND NOT (u)-[:ACCEPT]->(o) AND NOT (o)-[:PAIRED_FOR]-(today)',
  'WITH COUNT(DISTINCT l) AS cntlikes,o',
  'WITH o ORDER BY cntlikes DESC',
  'WITH HEAD(collect(o)) as user',
  'MATCH (user)-[:LIKES]->(like),(user)-[:HAS_TAG]->(tag),(user)-[:IS_AT]->(location)',
  'RETURN user,collect(DISTINCT like) as likes ,collect(DISTINCT tag) as tags,location'
  ].join('\n');

  colog.log('create query', query);

  callback(null, query, cypherParams);
};

var _selected = function (params, callback) {
  var date =  new Date(Date.now());
  var cypherParams = {
    userId : params.id,
    selectedUserId : params.selectedUserId,
    date : date.toDateString()
  };
  var query; 
  console.log(params.accepted);
  if(params.accepted === 'true'){

    query = [
      'MERGE (today:Date{id:{date}})',
      'WITH today',
      'MATCH (u:User{id:{userId}}),(o:User{id:{selectedUserId}}),(today)',
      'WHERE NOT (u)-[:REJECT]-(o) OR NOT (o)-[:PAIRED_FOR]-(today)',
      'CREATE UNIQUE (u)-[:ACCEPT]->(o)',
      'WITH u,o,today',
      'MATCH (o)-[:ACCEPT]->(u)',
      'CREATE UNIQUE (o)-[:PAIRED_FOR]->(today)<-[:PAIRED_FOR]-(u)',
      'RETURN o as user'
    ].join('\n');
    
  }else{
  query = [
      'MATCH (u:User{id:{userId}}),(o:User{id:{selectedUserId}})',
      'CREATE UNIQUE (u)-[r:REJECT]-(o)',
      'RETURN o as user'
    ].join('\n');
  }

  colog.info('create query', query);

  callback(null, query, cypherParams);
};



// create a new user

var findAllMatches = new Construct(_findAllMatches, _singleUserProfile);

var userSelected = new Construct(_selected, _singleUser);

// export exposed functions
module.exports = {
  getAll: findAllMatches.done(),
  userSelected: userSelected.done(),
};
