'use strict';

// Declare app level module which depends on filters, and services
angular.module('services', [])

.service('Request', ['$http', '$q', function($http, $q){

  this.post = function(url, obj, headers) {
    // body...

    var data = obj || {};
    // $.extend(true, data, {
    //   source: 'web',
    //   deviceid: $localStorage.auth.deviceid,
    //   imei: $localStorage.auth.imei,
    //   token: $localStorage.auth.token,
    //   version: '2'
    // });

    var req = {
      "method": 'post',
      "url": url,
      "data": angular.toJson(data, true),
      "headers": headers
    };

    var defer = $q.defer();
    $http(req).then(function(res) {
      console.log(res);
      defer.resolve(res.data);
    });
    return defer.promise;
  }

  this.get = function(url, headers) {
    // body...
    var config = {};
    $.extend(true, config, {
      headers: headers
    });
    console.log(url, headers, config);
    var defer = $q.defer();
    $http.get(url, config).then(function(res) {
      console.log(res);
      defer.resolve(res.data);
    });

    return defer.promise;

  }
}])