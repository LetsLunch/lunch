'use strict';

angular.module('Lunch.profile', [
  'openfb',
  'Lunch.factory.Geo',
  'Lunch.factory.requests',
  'Lunch.service.matchData'
])
.config(function($stateProvider) {
  $stateProvider
  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent' :{
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  });
})

.controller('ProfileCtrl', function($q, $rootScope, $state, $scope,
                                    $ionicSlideBoxDelegate, $window,
                                    storedUserData, OpenFB, Geo, localStore,
                                    requests, matchData, match) {
  if (match.id === undefined) {
    $scope.action = 'Find a Lunch Buddy';
    $scope.takeAction = function() { $state.go('app.browse'); };
  } else {
    $scope.action = 'Plan your Lunch';
    $scope.takeAction = function() { $state.go('app.chats'); };
  }

  // Store data in scope
  $scope.userData = storedUserData;

  $scope.getLikes = function() {
    OpenFB.get('/me/likes') 
      .success(function(fbLikeObj){
        // need to keep track of old ids
        var idTrack = {};
        angular.forEach(fbLikeObj.data, function(value){
          //if a new like / id 
          if(value.name){
            //inform the database if a new id
            //add the new id and like data locally
            $scope.userData.likes[value.id] = value.name;
    
            postLikes(value);
          }
          //track id
          idTrack[value.id] = true;
        });
        // check ids fetched from fb to local ids.
        // if like stored locally no longer
        // avaiable from fb, inform the db and (then) delete locally
        for(var like in $scope.userData.likes) {
          if(!idTrack[like]){
            console.info('Deleting like: ' + like + '; no longer in facebook');
            requests.deleteLike(like.id, {'userId': $scope.userData.id});
            delete $scope.userData.likes[like];
            // since the like no longer exists
            // inform database using like.id and user.id and like.name
            // ($scope.userData.likes[likeId])
          }
        }
      $rootScope.$emit('userDataChanged', $scope.userData);
      });
  };

  var postLikes = function(like) {
    requests.postLike({
      'userId' : $scope.userData.id,
      'id': like.id,
      'name': like.name
    });
  };

  var postTag = function(tagName) {
    requests.postTag({
      'userId' : $scope.userData.id,
      'id': tagName,
      'name': tagName
    });
  };

  var postTags = function() {
    angular.forEach(storedUserData.tags, function(value, key){
        // only post tags that are pressed currently
        if(value){
          postTag(key);
        }
    });
  };

  var deleteTag = function(tagName) {
    requests.deleteTag({
      'userId' : $scope.userData.id,
      'id': tagName
    });
  };

  var getPicture = function() {
    OpenFB.get('/me/picture?redirect=0&height=133&type=normal&width=100')
    .success(function(data){
      if(data !== $scope.userData.photo_url){
        var image =
          "<div class='userimage'><img src='" + data.data.url + "'/></div>";
        angular.element(document.querySelector('#userimage')).html(image);
        $scope.userData.photo_url = data.data.url;
        //tell the database the image associated with the user has changed
        postUser();
        $rootScope.$emit('userDataChanged', $scope.userData);
      }
    });
  };

  var getDetails = function() {
    var deferredPost = $q.defer();

    if ($scope.userData.id) {
      deferredPost.resolve();
    } else {
      OpenFB.get('/me')
      .success(function(data){
        angular.extend($scope.userData, data);
        //store updates to data locally
        $rootScope.$emit('userDataChanged', $scope.userData);
        deferredPost.resolve();
      })
      .error(function(err){
        $window.alert('Unable to reach Facebook');
        deferredPost.reject();
      });
    }

    return deferredPost.promise;
  };

  $scope.tagClick = function(e){
    var clickedText = e.toElement.innerText;
    var wasPressed = $scope.userData.tags[clickedText];

    // toggle the state of the tag
    //if it was pressed, and is now not pressed, delete the tag
    if(wasPressed){
      deleteTag(clickedText);
      $scope.userData.tags[clickedText] = false;
    //if it was not pressed, and is now pressed, create the tag
    } else {
      postTag(clickedText);
      $scope.userData.tags[clickedText] = true;
    }
    $rootScope.$emit('userDataChanged', $scope.userData);
  };

  var postUser = function(){
    return getDetails().then(function() {
      return requests.postBasicDetails({
        'id' : $scope.userData.id,
        'firstname': $scope.userData.first_name,
        'lastname': $scope.userData.last_name,
        'profileImage': $scope.userData.photo_url
      });
    });
  };

  var postLocation = function(pos) {
    $scope.userData.geolocation = pos.coords;
      OpenFB.checkLogin().then(function(userId) {
        requests.postLocation({
          'userId': userId,
          'lat': pos.coords.latitude,
          'lng': pos.coords.longitude
        }).then(function(res) {
          console.info('You are in ' + angular.fromJson(res).data.city);
          $scope.userData.location = angular.fromJson(res).data.city;
          $rootScope.$emit('userDataChanged', $scope.userData);
        });
    });
  };

  // this triggers every time we go to the profile page
  $scope.$on('$stateChangeSuccess', function(e, state) {
    postUser().then(function() {
      getPicture();
      $scope.getLikes();

      //post tags on initialisation
      postTags();

      Geo.getCurrentPosition()
        .then(function(pos) { postLocation(pos); })
        .catch(function(err) { console.error(err); });
      });
  });
});
