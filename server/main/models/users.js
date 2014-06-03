'use strict';

// ## Module Dependencies
var _ = require('lodash');
var User = require('./neo4j/user.js');
var UserProfile = require('./neo4j/userprofile.js');
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
// return a single user
var _singleUserProfile = function (results, callback) {
  if (results.length) {
    // console.log(new UserProfile(results[0]));
    callback(null, new UserProfile(results[0]));
  } else {
    callback(null, null);
  }
};


// return many users
var _manyUsers = function (results, callback) {
  var users = _.map(results, function (result) {
    return new User(result.user);
  });

  callback(null, users);
};


// ## Query Functions
// Should be combined with results functions using _.partial()

var _matchBy = function (keys, params, callback) {
  var cypherParams = _.pick(params, keys);

  var query = [
    'MATCH (user:User)',
    Cypher.where('user', keys),
    'WITH user',
    'MATCH (user)-[:LIKES]->(like:Like)',
    'WITH user,like',
    'MATCH (user)-[:HAS_TAG]->(tag:Tag)',
    'WITH user,like,tag',
    'RETURN user,COLLECT( DISTINCT like) as likes,COLLECT( DISTINCT tag) as tags'
  ].join('\n');

  colog.info(query);

  callback(null, query, cypherParams);
};

var _matchByUUID = _.partial(_matchBy, ['id']);

var _matchAll = _.partial(_matchBy, []);

// creates the user with cypher
var _create = function (params, callback) {
  colog.info(params);
  var cypherParams = {
    id : params.id,
    firstname : params.firstname,
    lastname : params.lastname,
    profileImage : params.profileImage,
  };

  var query = [

    'MERGE (user:User{id: {id}})',
    'ON CREATE',
      'SET user.created = timestamp()',
    'SET user.lastLogin = timestamp()'
  ];

  if (cypherParams.firstname){
    query.push( 
    'SET user.firstname ={firstname}');
  }
  if (cypherParams.lastname){
    query.push(
    'SET user.lastname= {lastname}');
  }
  if (cypherParams.profileImage){
    query.push(
    'SET user.profileImage = {profileImage}');
  } 
  query.push(
    'RETURN user');
  
  query = query.join('\n');

  colog.info(query);

  callback(null, query, cypherParams);
};

// delete the user and any relationships with cypher
var _delete = function (params, callback) {
  var cypherParams = {
    id: params.id
  };

  var query = [
    'MATCH (user:User {id:{id}})',
    'OPTIONAL MATCH (user)-[r]-()',
    'DELETE user, r',
  ].join('\n');

  callback(null, query, cypherParams);
};

// delete all users
var _deleteAll = function (params, callback) {
  var cypherParams = {};

  var query = [
    'MATCH (user:User)',
    'OPTIONAL MATCH (user)-[r]-()',
    'DELETE user, r',
  ].join('\n');

  callback(null, query, cypherParams);
};

// create a new user

var getById = new Construct(_matchByUUID).query().then(_singleUserProfile);

var getAll = new Construct(_matchAll, _manyUsers);

var create = new Construct(_create, _singleUser);
// get a user by id and update their properties
// var update = new Construct(_update, _singleUser);

// delete a user by id
var deleteUser = new Construct(_delete);

// delete a user by id
var deleteAllUsers = new Construct(_deleteAll);

// export exposed functions
module.exports = {
  getById: getById.done(),
  create: create.done(),
  getAll: getAll.done(),
  deleteUser: deleteUser.done(),
  deleteAllUsers: deleteAllUsers.done(),
};
