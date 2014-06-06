'use strict';

angular.module('Lunch', ['ionic',  'openfb', 'push', 'Lunch.profile', 'Lunch.browse', 'Lunch.matched', 'Lunch.nomatches', 'Lunch.noshow', 'Lunch.chats', 'Lunch.login','Lunch.factory.Geo', 'Lunch.factory.localStore','Lunch.factory.storedUserData', 'Lunch.service.matchData', 'Lunch.service.storedChat'])

.config(function($provide, $stateProvider, $urlRouterProvider) {
  // Set application server
  // TODO: Change this to your production server
  $provide.constant('fbAPI', '765912086774968');
  $provide.constant('gcmAPI', '142933827745');
  $provide.constant('AppServer', 'http://127.0.0.1:8008');
  $provide.value('match', null);

  // Set initial paths
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/profile');
})

.run(function($ionicPlatform, $rootScope, $state, $window, OpenFB, push, fbAPI, gcmAPI) {
  $ionicPlatform.ready(function() {
    if($window.StatusBar) {
      $window.StatusBar.styleDefault();
    }
  });

  // Initialize with localhost to support development
  // (cordova will default to https://www.facebook.com/)
  OpenFB.init(fbAPI, 'http://localhost:9000/oauth.html', $window.localStorage);
  push.init();

  // Force authentication
  $rootScope.$on('$stateChangeStart', function(e, state) {
    if (OpenFB.isLoggedIn()) {
      if (state.name === 'app.login') {
        $state.go('app.profile');
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

  $rootScope.$on('pushNotificationStart', function(e, userData) {
      $state.go('app.match');
      // at this point also send the message to a matched user factory
      // so that the match view has a means ot obtain the data required
  });

});
