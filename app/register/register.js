"use strict";
angular.module('register', ['firebase.utils', 'firebase.auth', 'ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
      controller: 'RegisterCtrl',
      templateUrl: '/register/register.html'
    });
  }])

  .controller('RegisterCtrl', ['$scope', 'Auth', '$location', 'fbutil', '$rootScope', '$http', 'EXT_ENDPOINTS', 'Request', function($scope, Auth, $location, fbutil, $rootScope, $http, EXT_ENDPOINTS, Request) {
    if (!!!$rootScope.cat) {
      $location.path.resolve('/');
    };
    $scope.email = null;
    $scope.pass = null;
    $scope.confirm = null;
    $scope.createMode = false;
    $scope.user = {
      domains: {}
    };

    $scope.login = function(email, pass) {
      $scope.err = null;
      Auth.$authWithPassword({ email: email, password: pass }, {rememberMe: true})
        .then(function(/* user */) {
          $location.path('/account');
        }, function(err) {
          $scope.err = errMessage(err);
        });
    };

    $scope.chooseDomain = function() {
      // body...
      $scope.domain = $scope.user.domain;

    }
    $scope.checkDomain = function () {
      // body...
      $scope.urls = undefined;
      var endpoint = EXT_ENDPOINTS['mashape']['url'] + "&registrar=namecheap.com&ma=nbio";
      var url = endpoint + '&q=' + $scope.domain;

      var headers = {
          'X-Mashape-Key': EXT_ENDPOINTS['mashape']['key'],
          'Accept': 'application/json'
      }

      Request.get(url, headers)
      .then(function(res) {
        $scope.urls = res.results || undefined;
      }, function(err) {
        console.log(err);
      })
    }

    $scope.createAccount = function() {
      $scope.err = null;
      if( assertValidAccountProps() ) {
        console.log($scope.user, $scope.email, $scope.pass);
        $scope.start = true;
        var email = $scope.email;
        var pass = $scope.pass;
        // console.log();
        // create user credentials in Firebase auth system
        Auth.$createUser({email: email, password: pass})
          .then(function() {
            console.log($scope.user);
            // authenticate so we have permission to write to Firebase
            return Auth.$authWithPassword({ email: email, password: pass });
          })
          .then(function(user) {
            console.log(user, 'User in Firebase');
            // create a user profile in our data store
            var ref = fbutil.ref('users', user.uid);
            $scope.user.email = $scope.email;
            return fbutil.handler(function(cb) {
              ref.set($scope.user, cb);
            });
          })
          .then(function( user ) {
            console.log(user, 'Usre profile');
            // redirect to the account page
            $location.path('/account');
          }, function(err) {
            $scope.err = errMessage(err);
            console.log($scope.err);
          });
      }
      $scope.start = false;
    };

    function assertValidAccountProps() {
      if( !$scope.email ) {
        $scope.err = 'Please enter an email address';
      }
      else if( !$scope.pass || !$scope.confirm ) {
        $scope.err = 'Please enter a password';
      }
      else if( $scope.createMode && $scope.pass !== $scope.confirm ) {
        $scope.err = 'Passwords do not match';
      }
      return !!!$scope.err;
    }

    function errMessage(err) {
      return angular.isObject(err) && err.code? err.code : err + '';
    }

    function firstPartOfEmail(email) {
      return ucfirst(email.substr(0, email.indexOf('@'))||'');
    }

    function ucfirst (str) {
      // inspired by: http://kevin.vanzonneveld.net
      str += '';
      var f = str.charAt(0).toUpperCase();
      return f + str.substr(1);
    }
  }]);