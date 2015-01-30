'use strict';

angular.module('risevision.displaysApp.directives')
  .directive('displayFields', ['COUNTRIES', 'REGIONS_CA', 'REGIONS_US',
    'TIMEZONES',
    function (COUNTRIES, REGIONS_CA, REGIONS_US, TIMEZONES) {
      return {
        restrict: 'E',
        scope: {
          display: '=',
          displayId: '=?'
        },
        templateUrl: 'partials/display-fields.html',
        link: function ($scope) {
          $scope.countries = COUNTRIES;
          $scope.regionsCA = REGIONS_CA;
          $scope.regionsUS = REGIONS_US;
          $scope.timezones = TIMEZONES;
        } //link()
      };
    }
  ]);
