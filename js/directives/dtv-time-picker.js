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

          // Default time 2:00am
          var e = new Date();
          e.setHours(2);
          e.setMinutes(0);

          $scope.$watch('time', function (newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
              ctrl.$setViewValue(timeParser.getTime(newValue));
            }
          });

          $scope.$watch(attrs.ngModel, function (newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
              $scope.time = timeParser.parseTime(newValue);
            } else {
              $scope.time = e;
            }
          });

        } //link()
      };
    }
  ]);
