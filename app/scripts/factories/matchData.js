'use strict';
angular.module('Lunch.factory.matchData', [])
.factory('matchData', function($rootScope){
  $rootscope.$on('matches', function(e, matchData){
    $scope.counter = 0;
    $scope.matchLength = matchData.length;
    $scope.matchData = matchData;
  });
  $rootScope.$on('nextMatch', function(e){
    $scope.counter++;
    if($scope.counter > $scope.matchLength){
        $rootScope.$emit('nomorematches');
    }
  });
  var match = matchData[$scope.counter] || undefined;
  return match;
    // 'matches' : [
    // {
    //     id : 12345,
    //     firstname : 'Bill',
    //     lastname : 'Gates',
    //     profileImage : 'http://mostfamousperson.net/BillGates.png',
    //     likes : ['Computers', 'Health', 'Kale'],
    //     city : 'Redmond',
    //     tags : ['Malaria', 'PCs', 'R&D']
    // },
    // {
    //     id: 56789,
    //     firstname: 'Steve',
    //     lastname: 'Jobs',
    //     profileImage : 'http://www.tanld.com/Portals/0/Images/steve-jobs.jpg',
    //     likes : ['Design', 'Simplicity', 'Fruitarian-Diet'],
    //     city : 'Unknown',
    //     tags : ['Geek-chic']
    // }]
});