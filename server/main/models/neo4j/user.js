'use strict';

// ## Module Dependencies
var _ = require('underscore');

var User = function (_node) {
  _.extend(this, _node.data);
};

User.prototype.modelName = 'User'; // currently unused

module.exports = User;