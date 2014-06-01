'use strict';

// ## Module Dependencies
var _ = require('lodash');
var Loc = require('./neo4j/location.js');
var zipcoder = require('cities');
var Architect = require('neo4j-architect');

Architect.init();

var Construct = Architect.Construct;
var Cypher = Architect.Cypher;

// ## Results Functions
// To be combined with queries using _.partial()

var _singleLoc = function (results, callback) {
  console.log("_singleLoc results:  ",results);
  if (results.length) {
    callback(null, new Loc(results[0].newLocation));
  } else {
    callback(null, null);
  }
};



// ## Query Functions
// Should be combined with results functions using _.partial()

// find location of UserId with cypher
var _findByUserId = function (params, callback) {
  console.log('params :->',params);
  var cypherParams = {
    userId : params.userId,
  };

  var query = [
    'MATCH (user:User{id:{userId}})-[r:IS_AT]->(loc:Location)',
    'RETURN loc',
  ].join('\n');

  console.log('create query', query);

  callback(null, query, cypherParams);
};

// creates the user with cypher
// {
//        lat: 52.519444,
//        lng: 13.406667,
//        zipcode: '10178',
//        city: 'Berlin',
//        country: 'Germany',
//    }
var _create = function (params, callback) {
  console.log('params :->',params);
  console.log(zipcoder.gps_lookup(parseFloat(params.lat),parseFloat(params.lng)));
  // parseFloat(params.lat),parseFloat(params.lng)

  var data = zipcoder.gps_lookup(parseFloat(params.lat),parseFloat(params.lng));
  console.log("zipcoder: ",data);
  var cypherParams = {
    userId : params.userId,
    zipcode : data.zipcode,
    city : data.city,
    state : data.state,
    lat : params.lat,
    lng : params.lng
  };

  var query = [
    'MATCH (user:User{id:{userId}})',
    'OPTIONAL MATCH (user)-[r:IS_AT]->(location:Location)',
    'DELETE r',
    'WITH user',
    'MERGE (newLocation:Location{id:{zipcode},zipcode:{zipcode},city:{city},state:{state},lat:{lat},lng:{lng}})',
    'CREATE (user)-[r:IS_AT]->(newLocation)',
    'RETURN newLocation'
  ].join('\n');

  console.log('create query', query);

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
