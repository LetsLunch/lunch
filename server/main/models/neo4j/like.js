'use strict';

// ## Module Dependencies
var _ = require('lodash');

var Like = function (_node) {
  _.extend(this, _node.data);
};

module.exports = Like;