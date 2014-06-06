'use strict';

angular.module('Lunch.logout', ['openfb'])

.controller('LogoutCtrl', function($scope, $state, OpenFB, push) {
  $scope.logout = function() {
    OpenFB.logout();
    push.unregister();
    $state.go('app.login');
  };
});
