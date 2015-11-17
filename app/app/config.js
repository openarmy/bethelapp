'use strict';

// Declare app level module which depends on filters, and services
angular.module('config', [])

  // version of this seed app is compatible with angularFire 1.0.0
  // see tags for other versions: https://github.com/firebase/angularFire-seed/tags
  .constant('version', '1.0.0')

  // where to redirect users if they need to authenticate (see security.js)
  .constant('loginRedirectPath', '/login')

  // your Firebase data URL goes here, no trailing slash
  .constant('FBURL', 'https://bethelapp.firebaseio.com')

  .constant('EXT_ENDPOINTS', {
    'mashape': {
        'url': 'https://domainr.p.mashape.com/v1/search?mashape-key=',
        'key': 'RTqSkoKZcImshYSyr1Awmei73GvNp1A4KNQjsnNLUbbGqPWcNv'
    }
  })

  // App wide route configuration
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
  }])

  // double check that the app has been configured before running it and blowing up space and time
  .run(['FBURL', '$timeout', function(FBURL, $timeout) {
    if( FBURL.match('//INSTANCE.firebaseio.com') ) {
      angular.element(document.body).html('<h1>Please configure app/config.js before running!</h1>');
      $timeout(function() {
        angular.element(document.body).removeClass('hide');
      }, 250);
    }
  }]);

