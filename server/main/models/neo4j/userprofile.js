'use strict';

// ## Module Dependencies
var _ = require('lodash');

var UserProfile = function (_node) {
  this.user = _node.user.data;
  this.location = _node.location.data;
  var that = this;
  that.likes = [];
  that.tags = [];
  _.each(_node.likes,function(like,i){
      that.likes[i] = like.data;
  });
  _.each(_node.tags,function(tag,i){
      that.tags[i] = tag.data;
  });
};

module.exports = UserProfile;
