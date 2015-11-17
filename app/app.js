'use strict';

// Declare app level module which depends on filters, and services
angular.module('home', [
    'config',
    'security',
    'services',
    'index',
    'register',
    'myApp.home',
    'myApp.login',
    'myApp.chat',
    'myApp.account',
    'angular.validators'
  ])

  .run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location) {
    // track status of authentication
    //
    $rootScope.path = function(link) {
      $location.path(link);
    };



    Auth.$onAuth(function(user) {
      $rootScope.loggedIn = !!user;
    });
  }]);
