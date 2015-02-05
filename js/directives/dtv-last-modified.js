'use strict';

angular.module('risevision.displaysApp.directives')
  .directive('lastModified', [
    function () {
      return {
        restrict: 'E',
        scope: {
          changeDate: '=',
          changedBy: '='
        },
        templateUrl: 'partials/last-modified.html',
        link: function ($scope) {
          $scope.$watch('changedBy', function(newVal) {
            $scope.changedBy = $scope.changedBy ? $scope.changedBy : 'N/A';
          });
        } //link()
      };
    }
  ]);
