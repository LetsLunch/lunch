'use strict';

/* jshint camelcase:false */

// ## Module Dependencies
var swagger = require('swagger-node-express');
var url = require('url');
var models = require('../models/swagger');
var users = require('./api/users');
var PORT = process.env.PORT || 8008;
var BASE_URL    = process.env.BASE_URL || "http://localhost:"+PORT;

// var locations = require('./api/locations');
// var likes = require('./api/likes');

module.exports = function (subpath) {

  // Set the main handler in swagger to the express subpath
  swagger.setAppHandler(subpath);

  // This is a sample validator.  It simply says that for _all_ POST, DELETE, PUT
  // methods, the header `api_key` OR query param `api_key` must be equal
  // to the string literal `special-key`.  All other HTTP ops are A-OK
  swagger.addValidator(
    function validate(req, path, httpMethod) {
      //  example, only allow POST for api_key="special-key"
      if ('POST' === httpMethod || 'DELETE' === httpMethod || 'PUT' === httpMethod) {
        var apiKey = req.headers.api_key;
        
        if (!apiKey) apiKey = url.parse(req.url,true).query.api_key;
        if ('special-key' === apiKey) return true;
        return false;
      }

      return true;
    }
  );

  // Add models and methods to swagger
  swagger.addModels(models)

    // User Model and Methods
    .addGet(users.list)
    .addGet(users.findById)
    .addPost(users.addUser)
    .addPost(users.addUsers)
    .addPut(users.updateById)
    .addDelete(users.deleteUser)
    .addDelete(users.deleteAllUsers)
  //   .addPut(users.resetUsers)

    // Skill Model and Methods
    // .addGet(skills.findByName)
    // .addPost(skills.addSkill)

    // // Location Model and Methods
    // .addGet(locations.find)
    // .addPost(locations.addLocation)
    
    // // Company Model and Methods
    // .addGet(companies.list)
    // .addGet(companies.findById)
    // .addPost(companies.addCompany)

    // // Job Model and Methods
    // .addGet(jobs.list)
    // .addGet(jobs.findById)
    // .addPost(jobs.addJob)
    // ;

  // swagger.configureDeclaration('users', {
  //   description: 'User Operations',
  //   // authorizations: ['oath2'],
  //   produces: ['application/json']
  // });

  // set api info
  swagger.setApiInfo({
    title: 'Neo4j-Swagger API',
    description: 'This a sample server built on top of Neo4j, a graph database. The neo4j toggle (<b>top right</b>) controls whether the underlying neo4j cypher queries are returned to the client. Learn more at <a href="https://github.com/tinj/node-neo4j-swagger-api">https://github.com/tinj/node-neo4j-swagger-api</a>'
  });

  swagger.setAuthorizations({
    apiKey: {
      type: 'apiKey',
      passAs: 'header'
    }
  });

  // put the resource listing under /api-docs
  // and ditch the .{format} on each of the apis
  swagger.configureSwaggerPaths('', '/api-docs', '');

  swagger.configure(BASE_URL + '/api/v0', '0.1.4');
};



