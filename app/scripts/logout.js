'use strict';

angular.module('Lunch.logout', ['openfb'])

.controller('LogoutCtrl', function($scope, $state, OpenFB) {
  $scope.logout = function() {
    OpenFB.logout();
    $state.go('app.login');
  };
});
