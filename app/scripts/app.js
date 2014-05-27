'use strict';
angular.module('Lunch', ['ionic',  'Lunch.profile', 'Lunch.browse', 'Lunch.nomatches', 'Lunch.noshow'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('AppCtrl', function($scope) {
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent' :{
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })

    .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent' :{
          templateUrl: 'templates/browse.html',
          controller: 'BrowseCtrl'
        }
      }
    })

    .state('app.noMatches', {
      url: '/noMatches',
      views: {
        'menuContent' :{
          templateUrl: 'templates/nomatches.html',
          controller: 'NoMatchesCtrl'
        }
      }
    })

    .state('app.noShow', {
      url: '/noShow',
      views: {
        'menuContent' :{
          templateUrl: 'templates/nomatches.html',
          controller: 'NoMatchesCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/profile');
});

