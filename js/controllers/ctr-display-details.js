'use strict';

//updated url parameters to selected display status from status filter
angular.module('risevision.displaysApp.controllers')
  .controller('displayDetailsCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
      $scope.selectedDisplayId = $routeParams.displayId;
    }
  ]);
