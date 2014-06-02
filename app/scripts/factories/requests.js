'use strict';
angular.module('Lunch.factory.requests', [])
// .config(function ( $httpProvider) {        
//         delete $httpProvider.defaults.headers.common['X-Requested-With'];
//          $httpProvider.defaults.useXDomain = true;﻿
         
// })
.factory('requests', function($rootScope, $http){
	var exports = {
		'postBasicDetails': function(payload){
      // console.log(payload);
      $http({method: 'POST', url: 'http://localhost:8008/users', data: payload,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, api_key',
        }
      })
      .success(function(data,status,headers,config){
        alert(data);
      })
      .error(function(data,status,headers,config){
        alert('error', data);
      });
    },
    'postLike': function(payload){
      // console.log(payload);
      $http({method: 'POST', url: 'http://localhost:8008/likes', data: payload
      })
      .success(function(data,status,headers,config){
        console.log(data);
      })
      .error(function(data,status,headers,config){
        console.log('error', data);
      });
    },
    'postLocation': function(payload){
      // console.log(payload);
      $http({method: 'POST', url: 'http://localhost:8008/locations', data: payload
      })
      .success(function(data,status,headers,config){
        console.log(data);
      })
      .error(function(data,status,headers,config){
        console.log('error', data);
      });
    },
    'getLocation' : function(userId){
      $http({method: 'GET', url: 'http://localhost:8008/locations' + userId
      })
      .success(function(data,status,headers,config){
        console.log(data);
      })
      .error(function(data,status,headers,config){
        console.log('error', data);
      });
    }
	};

	return exports;
});