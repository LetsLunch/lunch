'use strict';
angular.module('logout', ['openfb'])
.controller('LogoutCtrl', function($scope, OpenFB) {
  $scope.logout = function() {
    OpenFB.logout();
    // OpenFB.revokePermissions();
    // revoke permissions?
  };
});

