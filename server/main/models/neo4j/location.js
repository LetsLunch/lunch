'use strict';

// ## Module Dependencies
var _ = require('lodash');

var Loc = function (_node) {
  _.extend(this, _node.data);
};

module.exports = Loc;