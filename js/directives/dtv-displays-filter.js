'use strict';

angular.module('risevision.displaysApp.directives')
  .directive('displaysFilter', ['userState', 'display', 'BaseList', '$location',
    '$loading',
    function (userState, display, BaseList, $location, $loading) {

      return {
        restrict: 'E',
        $scope: {

        },
        templateUrl: 'partials/displays-filter.html',
        link: function ($scope) {

        } //link()
      };
    }
  ]);
