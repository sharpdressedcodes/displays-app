'use strict';

angular.module('risevision.displaysApp.controllers')
  .controller('confirmInstance', ['$scope', '$modalInstance',
    'confirmationMessage', 'confirmationButton',
    function ($scope, $modalInstance, confirmationMessage,
      confirmationButton) {
      $scope.confirmationMessage = confirmationMessage;
      $scope.confirmationButton = confirmationButton;

      $scope.ok = function () {
        $modalInstance.close();
      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }
  ]);
