'use strict';
angular.module('Lunch', ['ionic',  'openfb', 'Lunch.profile', 'Lunch.browse', 'Lunch.nomatches', 'Lunch.noshow', 'Lunch.login','Lunch.factory.Geo', 'Lunch.factory.localStore','Lunch.factory.storedUserData', 'Lunch.factory.storedUserData'])

.run(function($ionicPlatform, $rootScope, $state, $window, OpenFB) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  // Initialize with localhost to support development
  // (cordova will default to https://www.facebook.com/)
  OpenFB.init('765912086774968', 'http://localhost:9000/oauth.html');

  // Force login
  $rootScope.$on('$stateChangeStart', function(e, state) {
    if (!$window.sessionStorage['fbtoken'] && state.name !== 'app.login') {
      $state.go('app.login');
      e.preventDefault();
    }
  });

  $rootScope.$on('OAuthException', function() {
    $state.go('app.login');
  });

  $rootScope.$on('pushNotificationStart', function(e, userData) {
      $state.go('app.match');
      // at this point also send the message to a matched user factory 
      // so that the match view has a means ot obtain the data required
  });

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/profile');
});

