'use strict';
angular.module('Lunch', ['ionic',  'openfb', 'Lunch.profile', 'Lunch.browse', 'Lunch.nomatches', 'Lunch.noshow', 'Lunch.login'])

.run(function($ionicPlatform, $rootScope, $state, $window, OpenFB) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  OpenFB.init('765912086774968', 'https://www.facebook.com/connect/login_success.html');

  // Force login
  $rootScope.$on('$stateChangeStart', function(e, state) {
    if (!$window.sessionStorage['token'] && state.name !== 'app.login') {
      $state.go('app.login');
      event.preventDefault();
    }
  });

  $rootScope.$on('OAuthException', function() {
    $state.go('app.login');
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
  $urlRouterProvider.otherwise('/app/login');
});

