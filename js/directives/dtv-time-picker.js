'use strict';

angular.module('risevision.displaysApp.directives')
  .directive('timePicker', ['timeParser',
    function (timeParser) {

      return {
        restrict: 'E',
        require: 'ngModel',
        $scope: {},
        templateUrl: 'partials/time-picker.html',
        link: function ($scope, elm, attrs, ctrl) {
          $scope.hstep = 1;
          $scope.mstep = 15;
          $scope.ismeridian = true;

          $scope.changed = function () {
            ctrl.$setViewValue($scope.time);
          };

          $scope.$watch(attrs.ngModel, function (newValue, oldValue) {
            if (newValue instanceof Date) {
              $scope.time = newValue;
            } else {
              ctrl.$setViewValue(timeParser(newValue));
            }
          });

        } //link()
      };
    }
  ]);
