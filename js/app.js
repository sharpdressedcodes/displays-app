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
