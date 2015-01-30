'use strict';

// controls Restart/Reboot functionality
angular.module('risevision.displaysApp.controllers')
  .controller('displayControls', ['$scope', 'display',
    '$log', '$modal',
    function ($scope, display, $log, $modal) {
      var _restart = function (displayId) {
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

      var _reboot = function (displayId) {
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

      $scope.confirm = function (displayId, mode) {
        $scope.modalInstance = $modal.open({
          templateUrl: 'partials/confirm-modal.html',
          controller: 'confirmInstance',
          windowClass: 'modal-custom',
          resolve: {
            confirmationMessage: function () {
              return 'The Rise Player on the Display\'s Computer will ' +
                mode +
                ' and the currently Scheduled Content will be interrupted. Do you wish to proceed?';
            },
            confirmationButton: function () {
              return 'common.okay';
            }
          }
        });

        $scope.modalInstance.result.then(function () {
          // do what you need if user presses ok
          if (mode === 'reboot') {
            _reboot(displayId);
          } else if (mode === 'restart') {
            _restart(displayId);
          }
        }, function () {
          // do what you need to do if user cancels
        });
      };
    }
  ]);
