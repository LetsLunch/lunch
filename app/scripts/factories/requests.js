'use strict';
angular.module('Lunch.factory.requests', [])
.config(function ( $httpProvider) {        
        $httpProvider.defaults.useXDomain = true;﻿
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
         
})

.factory('requests', function($rootScope, $http, $q, APIHost){
  var baseUrl = APIHost + '/api/v0/';
  var api_key = '?api_key=special-key&neo4j=true';
  var urls = {
    'basicDetails' : 'users',
    'like' : 'likes',
    'tag' : 'tags',
    'location' :'locations',
    'pushToken' : 'pushes',
    'chat' : 'chat',
    'match' : 'match'
  };
	var exports = {
		'postBasicDetails': function(payload){
      return $http({
        method: 'POST',
        url: baseUrl + urls.basicDetails + api_key,
        data: payload
      });
    },
    'getDetails' : function(userId){
      return $http({
        method: 'GET',
        url: baseUrl + urls.basicDetails + '/' + userId + api_key
      });
    },
    'postLike': function(payload){
      return $http({
        method: 'POST',
        url: baseUrl + urls.like + api_key,
        data: payload
      });
    },
     'deleteLike': function(likeId, payload){
      return $http({
        method: 'DELETE',
        url: baseUrl + urls.like + '/' + likeId + api_key,
        data: payload
      });
    },
    'postTag': function(payload){
      return $http({
        method: 'POST',
        url: baseUrl + urls.tag + api_key,
        data: payload
      });
    },
    'deleteTag': function(payload){
      return $http({
        method: 'DELETE',
        url: baseUrl + urls.tag + '/' + payload.id + api_key,
        data: payload
      });
    },
    'postLocation': function(payload){
      return $http({
        method: 'POST',
        url: baseUrl + urls.location + api_key,
        data: payload
      });
    },
    'getLocationDetails' : function(userId){
      return $http({
        method: 'GET',
        url: baseUrl + urls.location + '/'+ userId + api_key
      });
    },
    'getMatches': function(input){
      return $http({
        method: 'GET',
        url: baseUrl + urls.match + '/' + input.userId + api_key
      });
    },
    'postPushToken': function(payload){
      return $http({
        method: 'POST',
        url: baseUrl + urls.pushToken + api_key,
        data: payload
      });
    },
    'deletePushToken': function(token) {
      return $http({
        method: 'DELETE',
        url: baseUrl + urls.pushToken + '/' + token + api_key
      });
    },
    'postChat': function(matchId, payload) {
      return $http({
        method: 'POST',
        url: baseUrl + urls.chat + '/' + matchId + api_key,
        data: payload
      });
    },
    'postDecision': function(payload){
      return $http({
        method: 'POST',
        url: baseUrl + urls.match + '/' + payload.id + api_key,
        data: payload
      });
    }
	};

	return exports;
});