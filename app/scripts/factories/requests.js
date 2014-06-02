'use strict';
angular.module('Lunch.factory.requests', [])
.config(function ( $httpProvider) {        
        $httpProvider.defaults.useXDomain = true;﻿
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
         
})
.factory('requests', function($rootScope, $http){
  var baseUrl = 'http://localhost:8008/api/v0/';
  var api_key = '?api_key=special-key&neo4j=true';
  var urls = {
    'basicDetails' : 'users',
    'like' : 'likes',
    'location' :'locations'
  }
	var exports = {
		'postBasicDetails': function(payload){
      // console.log(payload);
      $http({method: 'POST', url: baseUrl + urls.basicDetails + api_key, data: payload
      })
      .success(function(data,status,headers,config){
        // alert(angular.fromJson(data));
      })
      .error(function(data,status,headers,config){
        // alert('error', data);
      });
    },
    'postLike': function(payload){
      // console.log(payload);
      $http({method: 'POST', url: baseUrl + urls.like + api_key, data: payload
      })
      .success(function(data,status,headers,config){
        // alert(angular.fromJson(data));
      })
      .error(function(data,status,headers,config){
        // alert('error', data);
      });
    },
     'deleteLike': function(likeId, userId){
      // console.log(payload);
      $http({method: 'DELETE', url: baseUrl + urls.like + '/' + likeId + api_key , data: userId
      })
      .success(function(data,status,headers,config){
        // alert(angular.fromJson(data));
      })
      .error(function(data,status,headers,config){
        // alert('error', data);
      });
    },
    'postLocation': function(payload){
      // alert(payload);
      $http({method: 'POST', url: baseUrl + urls.location + api_key, data: payload
      })
      .success(function(data,status,headers,config){
        var parsedData = angular.fromJson(data);
        $rootScope.$emit('userLocation', parsedData.city);
      })
      .error(function(data,status,headers,config){
        alert('in error postlocation');
      });
    },
    'getLocationDetails' : function(userId){
      $http({method: 'GET', url: baseUrl + urls.location + '/'+ userId + api_key
      })
      .success(function(data,status,headers,config){
        var parsedData = angular.fromJson(data);
        $rootScope.$emit('userLocation', parsedData.city);
      })
      .error(function(data,status,headers,config){
        // alert('error', data);
      });
    }
	};

	return exports;
});