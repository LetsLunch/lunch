'use strict';

// ## Module Dependencies
var url = require('url');

// ## Default Response Object

exports.defaultResponseObject = {
  object: '', // String descriptor for data type, either model name or list 
  data: null // Null, Object, Array
};

// ## Utility Functions

exports.setHeaders = function (res, queries, start) {
  res.header('Duration-ms', new Date() - start);
  if (queries) {
    res.header('Neo4j', JSON.stringify(queries));
  }
};

exports.writeResponse = function (res, results, queries, start) {
  exports.setHeaders(res, queries, start);
  res.send(results);
};

exports.getQueryValue = function (req, key) {
  return url.parse(req.url, true).query[key];
};

exports.getBodyParam = function (req, key) {
  // console.log(req.body)
  return req.body[key];
};

exports.existsInQuery = function (req, key) {
  return url.parse(req.url, true).query[key] !== undefined;
};

exports.normalizeString = function (string) {
  var res = string.toLowerCase();
  return res;
};