'use strict';

// ## Module Dependencies
var _ = require('lodash');

var Tag = function (_node) {
  _.extend(this, _node.data);
};

module.exports = Tag;
