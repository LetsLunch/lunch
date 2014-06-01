'use strict';

// ## Module Dependencies
var _ = require('lodash');
var Tag = require('./neo4j/tag.js');
var Architect = require('neo4j-architect');

Architect.init();

var Construct = Architect.Construct;
var Cypher = Architect.Cypher;

// ## Results Functions
// To be combined with queries using _.partial()

// return a single tag
var _singleTag = function (results, callback) {
  if (results.length) {
    callback(null, new Tag(results[0].tag));
  } else {
    callback(null, null);
  }
};

// return many tags
var _manyTags = function (results, callback) {
  var tags = _.map(results, function (result) {
    return new Tag(result.tag);
  });

  callback(null, tags);
};


// ## Query Functions
// Should be combined with results functions using _.partial()

var _matchBy = function (keys, params, callback) {
  var cypherParams = _.pick(params, keys);

  var query = [
    'MATCH (tag:Tag)',
    Cypher.where('tag', keys),
    'RETURN tag'
  ].join('\n');

  console.log('_matchBy query', query);

  callback(null, query, cypherParams);
};

var _matchByUUID = _.partial(_matchBy, ['id']);

var _matchAll = _.partial(_matchBy, []);

// creates the user with cypher
var _create = function (params, callback) {
  console.log('params :->',params);
  var cypherParams = {
    id : params.id,
    userId : params.userId,
    name : params.name,
  };

  var query = [
    'MATCH (user:User{id:{userId}})',
    'WITH user',
    'MERGE (tag:Tag{id:{id},name:{name}})',
    'CREATE UNIQUE (user)-[:HAS_TAG]->(tag)',
    'RETURN tag',
  ].join('\n');

  console.log('create query', query);

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
    'MATCH (tag:Tag {id:{id}})',
    'OPTIONAL MATCH (tag)<-[r]-()',
    'DELETE tag, r',
  ].join('\n');

  callback(null, query, cypherParams);
};

// delete relation between user and tag
var _deleteRelation = function (params, callback) {
  var cypherParams = {
    id: params.id,
    userId: params.userId,
  };

  var query = [
    'OPTIONAL MATCH (user:User{id:{userId}})-[r:HAS_TAG]->(tag:Tag{id:{id}})',
    'DELETE r',
  ].join('\n');

  callback(null, query, cypherParams);
};


var getById = new Construct(_matchByUUID).query().then(_singleTag);

var getAll = new Construct(_matchAll, _manyTags);

var create = new Construct(_create, _singleTag);
// get a user by id and update their properties
// var update = new Construct(_update, _singleUser);

var deleteTag = new Construct(_delete);

var deleteRelation = new Construct(_deleteRelation);

// export exposed functions
module.exports = {
  getById: getById.done(),
  create: create.done(),
  getAll: getAll.done(),
  deleteTag: deleteTag.done(),
  deleteTagRelation: deleteRelation.done(),
};
