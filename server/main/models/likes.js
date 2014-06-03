'use strict';

// ## Module Dependencies
var _ = require('lodash');
var Like = require('./neo4j/like.js');
var Architect = require('neo4j-architect');
var colog = require('colog');

Architect.init();

var Construct = Architect.Construct;
var Cypher = Architect.Cypher;

// ## Results Functions
// To be combined with queries using _.partial()

// return a single user
var _singleLike = function (results, callback) {
  if (results.length) {
    callback(null, new Like(results[0].like));
  } else {
    callback(null, null);
  }
};

// return many likes
var _manyLikes = function (results, callback) {
  var likes = _.map(results, function (result) {
    return new Like(result.like);
  });

  callback(null, likes);
};


// ## Query Functions
// Should be combined with results functions using _.partial()

var _matchBy = function (keys, params, callback) {
  var cypherParams = _.pick(params, keys);

  var query = [
    'MATCH (like:Like)',
    Cypher.where('like', keys),
    'RETURN like'
  ].join('\n');

  colog.info(query);

  callback(null, query, cypherParams);
};

var _matchByUUID = _.partial(_matchBy, ['id']);

var _matchAll = _.partial(_matchBy, []);

// creates the user with cypher
var _create = function (params, callback) {
  colog.info('params :->',params);
  var cypherParams = {
    id : params.id,
    userId : params.userId,
    name : params.name,
  };

  var query = [
    'MATCH (user:User{id:{userId}})',
    'WITH user',
    'MERGE (like:Like{id:{id},name:{name}})',
    'CREATE UNIQUE (user)-[:LIKES]->(like)',
    'RETURN like',
  ].join('\n');

  colog.info(query);

  callback(null, query, cypherParams);
};

// update the user with cypher
// var _update = function (params, callback) {

//   var cypherParams = {
//     id : params.id,
//     firstname : params.firstname,
//     lastname : params.lastname,
//   };

//   var query = [
//     'MATCH (user:User {id:{id}})',
//     'SET user.firstname = {firstname}',
//     'SET user.lastname = {lastname}',
//     'RETURN user'
//   ].join('\n');

//   callback(null, query, cypherParams);
// };

// delete the user and any relationships with cypher
var _delete = function (params, callback) {
  var cypherParams = {
    id: params.id
  };

  var query = [
    'MATCH (like:Like {id:{id}})',
    'OPTIONAL MATCH (like)<-[r]-()',
    'DELETE like, r',
  ].join('\n');

  callback(null, query, cypherParams);
};

// delete relation between user and like
var _deleteRelation = function (params, callback) {
  var cypherParams = {
    id: params.id,
    userId: params.userId,
  };

  var query = [
    'OPTIONAL MATCH (user:User{id:{userId}})-[r:LIKES]->(like:Like{id:{id}})',
    'DELETE r',
  ].join('\n');

  callback(null, query, cypherParams);
};

// create a new user

var getById = new Construct(_matchByUUID).query().then(_singleLike);

var getAll = new Construct(_matchAll, _manyLikes);

var create = new Construct(_create, _singleLike);
// get a user by id and update their properties
// var update = new Construct(_update, _singleUser);

// delete a user by id
var deleteLike = new Construct(_delete);

// delete a user by id
var deleteRelation = new Construct(_deleteRelation);

// export exposed functions
module.exports = {
  getById: getById.done(),
  create: create.done(),
  getAll: getAll.done(),
  deleteLike: deleteLike.done(),
  deleteLikeRelation: deleteRelation.done(),
};
