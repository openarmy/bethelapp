(function(angular) {
  "use strict";

  var app = angular.module('index', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute']);

  app.controller('IndexCtrl', ['$scope', 'fbutil', '$location', '$firebaseObject', 'FBURL', '$rootScope', function ($scope, fbutil, $location, $firebaseObject, FBURL, $rootScope) {
    $scope.syncedValue = $firebaseObject(fbutil.ref('syncedValue'));
    // $scope.user = user;
    $scope.FBURL = FBURL;
    if (!!!$rootScope.cat) {
      $location.path('/');
    };
    // mixpanel.track("Video play");
    mixpanel.track_pageview();
    $scope.startReg = function(cat) {
      $rootScope.cat = cat;
      console.log(cat);
      $location.path('/register');
    }
  }]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/home/home.html',
      controller: 'IndexCtrl'
    });
  }]);

})(angular);

