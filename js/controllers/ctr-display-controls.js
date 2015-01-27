'use strict';

// controls Restart/Reboot functionality
angular.module('risevision.displaysApp.controllers')
  .controller('displayControls', ['$scope', 'display',
    '$log',
    function ($scope, display, $log) {
      $scope.restart = function (displayId) {
        if (!displayId) {
          return;
        }

        $scope.controlsInfo = '';
        $scope.controlsError = '';

        display.restart(displayId)
          .then(function (resp) {
            $scope.controlsInfo = 'Reboot signal sent';
          })
          .then(null, function (e) {
            $scope.controlsError = e.message ? e.message : e.toString();
          });
      };

      $scope.reboot = function (displayId) {
        if (!displayId) {
          return;
        }

        $scope.controlsInfo = '';
        $scope.controlsError = '';

        display.reboot(displayId)
          .then(function (resp) {
            $scope.controlsInfo = 'Reboot signal sent';
          })
          .then(null, function (e) {
            $scope.controlsError = e.message ? e.message : e.toString();
          });
      };
    }
  ]);
