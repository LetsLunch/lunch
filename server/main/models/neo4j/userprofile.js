'use strict';

// ## Module Dependencies
var _ = require('lodash');

var UserProfile = function (_node) {
  console.log(_node);
  var that = this;
  this.user = _node.user.data;
  that.likes = [];
  that.tags = [];
  this.location = {};
  
  if(_node.location){
    this.location = _node.location.data;
  }

  if(_node.likes.length){
    _.each(_node.likes,function(like,i){
        that.likes[i] = like.data;
    });
  }

  if(_node.likes.length){
    _.each(_node.tags,function(tag,i){
        that.tags[i] = tag.data;
     });
  }
};

module.exports = UserProfile;
