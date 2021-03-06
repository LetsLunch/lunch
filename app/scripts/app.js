'use strict';

angular.module('Lunch', [
  'ionic',
  'openfb',
  'push',
  'Lunch.profile',
  'Lunch.browse',
  'Lunch.matched',
  'Lunch.nomatches',
  'Lunch.noshow',
  'Lunch.chats',
  'Lunch.login',
  'Lunch.factory.Geo',
  'Lunch.factory.localStore',
  'Lunch.factory.storedUserData',
  'Lunch.service.matchData',
  'Lunch.service.storedChat'
])

.config(function($provide, $stateProvider, $urlRouterProvider) {
  // Set application server
  // TODO: Change this to your production server
  $provide.constant('fbAPI', '765912086774968');
  $provide.constant('gcmAPI', '142933827745');
  $provide.constant('APIHost', 'http://getlunch.azurewebsites.net');
  $provide.value('match', {});

  // Set initial paths
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
})

.run(function($ionicPlatform, $rootScope, $state, $window, OpenFB, push, fbAPI,
              gcmAPI, match, storedChat) {
  $ionicPlatform.ready(function() {
    if($window.StatusBar) {
      $window.StatusBar.styleDefault();
    }
  });

  // Initialize with http://localhost to support development
  // (https is not set up to work locally)
  // (cordova will default to https://www.facebook.com/)
  OpenFB.init(fbAPI, 'http://localhost:9000/oauth.html', $window.localStorage);
  push.init();

  // Reset match if it's a new day
  if ($window.localStorage.matchDate !== new Date().toDateString()) {
    delete $window.localStorage.match;
    delete $window.localStorage.matchDate;
    storedChat.deleteChats();
  }

  // Force authentication
  $rootScope.$on('$stateChangeStart', function(e, state) {
    if (OpenFB.isLoggedIn()) {
      if (state.name === 'app.login') {
        if ($window.localStorage.match !== undefined) {
          match.id = $window.localStorage.match;
          $state.go('app.chats');
        } else {
          $state.go('app.profile');
        }
        e.preventDefault();
      }

    } else {
      if (state.name !== 'app.login') {
        $state.go('app.login');
        e.preventDefault();
      }
    }
  });

  // Catch oAuth2 exceptions
  $rootScope.$on('OAuthException', function() {
    $state.go('app.login');
  });
});
