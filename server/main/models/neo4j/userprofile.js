'use strict';

// ## Module Dependencies
var _ = require('lodash');

var UserProfile = function (_node) {
  this.user = _node.user.data;
  var that = this;
  that.likes = [];
  that.tags = [];
  this.location = {};
  if(_node.likes.length){
    _.each(_node.likes,function(like,i){
        that.likes[i] = like.data;
    });
  }
  if(_node.tags.length){
    _.each(_node.tags,function(tag,i){
        that.tags[i] = tag.data;
    });
  }
  if(_node.location){
    this.location = _node.location.data;
  }
};

module.exports = UserProfile;
