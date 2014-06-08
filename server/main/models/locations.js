'use strict';

// ## Module Dependencies
var _ = require('lodash');
var Loc = require('./neo4j/location.js');
var zipcoder = require('cities');
var Architect = require('neo4j-architect');
var colog = require('colog');

Architect.init();

var Construct = Architect.Construct;
var Cypher = Architect.Cypher;

// ## Results Functions
// To be combined with queries using _.partial()

var _singleLoc = function (results, callback) {
  if (results.length) {
    callback(null, new Loc(results[0].location));
  } else {
    callback(null, null);
  }
};



// ## Query Functions
// Should be combined with results functions using _.partial()

// find location of UserId with cypher
var _findByUserId = function (params, callback) {
  colog.info(params);
  var cypherParams = {
    userId : params.userId,
  };

  var query = [
    'MATCH (user:User{id:{userId}})-[r:IS_AT]->(location:Location)',
    'RETURN location',
  ].join('\n');

  colog.info(query);

  callback(null, query, cypherParams);
};

var _create = function (params, callback) {
  var data = zipcoder.gps_lookup(parseFloat(params.lat),parseFloat(params.lng));
  var cypherParams = {
    userId : params.userId,
    zipcode : data.zipcode,
    city : data.city,
    state : data.state,
  };

  var query = [
    'MATCH (user:User{id:{userId}})',
    'OPTIONAL MATCH (user)-[r:IS_AT]->(oldLocation:Location)',
    'DELETE r',
    'WITH user',
    'MERGE (location:Location{id:{zipcode}})',
      'ON CREATE SET location.zipcode = {zipcode},location.city={city},location.state={state}',
    'CREATE (user)-[r:IS_AT]->(location)',
    'RETURN location'
  ].join('\n');

  colog.info(query);

  callback(null, query, cypherParams);
};



// create a new user

var findByUserId = new Construct(_findByUserId,_singleLoc);

var create = new Construct(_create, _singleLoc);

// export exposed functions
module.exports = {
  find: findByUserId.done(),
  create: create.done(),
};
