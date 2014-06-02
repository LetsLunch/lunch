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
    'tag' : 'tags',
    'location' :'locations',
    'matches' : 'matches'
  }
	var exports = {
		'postBasicDetails': function(payload){
      $http({method: 'POST', url: baseUrl + urls.basicDetails + api_key, data: payload
      })
      .success(function(data,status,headers,config){
      })
      .error(function(data,status,headers,config){
        console.log('error in post basic details');
      });
    },
    'postLike': function(payload){
      $http({method: 'POST', url: baseUrl + urls.like + api_key, data: payload
      })
      .success(function(data,status,headers,config){
      })
      .error(function(data,status,headers,config){
        console.log('error in postlike', data);
      });
    },
     'deleteLike': function(likeId, payload){
      $http({method: 'DELETE', url: baseUrl + urls.like + '/' + likeId + api_key , data: payload
      })
      .success(function(data,status,headers,config){
        console.log('like deleted', data);
      })
      .error(function(data,status,headers,config){
        console.log('error in deleteLike', data);
      });
    },
    'postTag': function(payload){
      $http({method: 'POST', url: baseUrl + urls.tag + api_key, data: payload
      })
      .success(function(data,status,headers,config){
      })
      .error(function(data,status,headers,config){
        console.log('error in posttag', data);
      });
    },
    'deleteTag': function(tagId, userId){
      $http({method: 'DELETE', url: baseUrl + urls.tag + '/' + tagId + api_key , data: userId
      })
      .success(function(data,status,headers,config){
        console.log('tag deleted', data);
      })
      .error(function(data,status,headers,config){
        console.log('error in deleteLike', data);
      });
    },
    'postLocation': function(payload){
      $http({method: 'POST', url: baseUrl + urls.location + api_key, data: payload
      })
      .success(function(data,status,headers,config){
        var parsedData = angular.fromJson(data);
        $rootScope.$emit('userLocation', parsedData.city);
      })
      .error(function(data,status,headers,config){
        console.log('error in postLocation');
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
        console.log('error in getLocationDetails', data);
      });
    },
    'getMatches': function(){
      $http({method: 'GET', url: baseUrl + urls.matches + api_key
      })
      .success(function(data,status,headers,config){
        var parsedData = angular.fromJson(data);
        $rootScope.$emit('matches', parsedData);
      })
      .error(function(data,status,headers,config){
        console.log('error in getLocationDetails', data);
      });
    }
    // 'postApproval': function(){
    //   $http({method: 'POST', url: baseUrl + urls.tag + api_key, data: payload
    //   })
    //   .success(function(data,status,headers,config){
    //   })
    //   .error(function(data,status,headers,config){
    //     console.log('error in posttag', data);
    //   });
    // }
	};

	return exports;
});