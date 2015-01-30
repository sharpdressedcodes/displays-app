'use strict';

angular.module('risevision.displaysApp', [
  'ngRoute',
  'risevision.common.header',
  'risevision.common.header.templates',
  'ngTouch',
  'ui.bootstrap',
  'ui.bootstrap.showErrors',
  'dotdotdot-angular',
  'risevision.displaysApp.services',
  'risevision.displaysApp.controllers',
  'risevision.displaysApp.filters',
  'risevision.displaysApp.directives',
  'risevision.common.loading',
  'risevision.common.i18n'
])
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'partials/displays-list.html',
          controller: 'displaysList'
        })
        .when('/on-boarding', {
          templateUrl: 'partials/on-boarding.html',
          controller: 'AppCtrl'
        })
        .when('/display', {
          templateUrl: 'partials/display-add.html',
          controller: 'displayAdd'
        })
        .when('/display/:displayId', {
          templateUrl: 'partials/display-details.html',
          controller: 'displayDetails'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ])
  .run(['$rootScope', '$location', 'userState',
    function ($rootScope, $location, userState) {

      var originalRequestLocation; //keep track of the landing location so that the user can be redirected there when they fully login

      //watch the user authentication state, and redirect accordingly
      $rootScope.$watch(function () {
        return userState.getSelectedCompanyId();
      }, function (newVal, oldVal) {
        if (newVal && !oldVal) {
          //hase the user just finished logged in, go to main
          if (originalRequestLocation) {
            $location.path(originalRequestLocation);
          } else {
            $location.path('/');
          }
        } else if (!newVal) {
          if (!originalRequestLocation && $location.path() !==
            '/on-boarding') {
            originalRequestLocation = $location.path();
          }
          //if the user has not logged in, redirect to landing
          $location.path('/on-boarding');
        }
      }, true);
    }
  ])
  .config(['showErrorsConfigProvider',
    function (showErrorsConfigProvider) {
      showErrorsConfigProvider.trigger('keypress');
    }
  ]);

angular.module('risevision.displaysApp.services', [
  'risevision.common.header',
  'risevision.common.gapi'
]);

angular.module('risevision.displaysApp.filters', []);
angular.module('risevision.displaysApp.directives', [
  'risevision.displaysApp.filters'
]);
angular.module('risevision.displaysApp.controllers', []);
