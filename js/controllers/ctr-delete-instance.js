'use strict';

angular.module('risevision.displaysApp.controllers')
  .controller('deleteInstance', ['$scope', '$modalInstance',
    'confirmationMessage',
    function ($scope, $modalInstance, confirmationMessage) {
      $scope.confirmationMessage = confirmationMessage;

      $scope.ok = function () {
        $modalInstance.close();
      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }
  ]);
