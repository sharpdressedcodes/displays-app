'use strict';

//updated url parameters to selected display status from status filter
angular.module('risevision.displaysApp.controllers')
  .controller('displayDetails', ['$scope', '$routeParams',
    'display', '$location', '$loading', '$modal', '$log',
    function ($scope, $routeParams, display, $location,
      $loading, $modal, $log) {
      $scope.displayId = $routeParams.displayId;
      $scope.savingDisplay = false;

      $scope.$watch('loadingDisplay', function (loading) {
        if (loading) {
          $loading.start('displays-loader');
        } else {
          $loading.stop('displays-loader');
        }
      });

      $scope.$watch('displayId', function (displayId) {
        if (displayId) {
          _getDisplay();
        }
      });

      var _getDisplay = function () {
        //load the display based on the url param
        $scope.loadingDisplay = true;

        display.get($scope.displayId)
          .then(function (result) {
            $scope.display = result.item;
          })
          .then(null, function (e) {
            $scope.submitError = e.message ? e.message : e.toString();
          })
          .finally(function () {
            $scope.loadingDisplay = false;
          });
      };

      var _delete = function () {
        //show loading spinner
        $scope.loadingDisplay = true;

        display.delete($scope.displayId)
          .then(function (result) {
            $scope.display = result.item;

            $location.path('#/');
          })
          .then(null, function (e) {
            $scope.submitError = e.message ? e.message : e.toString();
          })
          .finally(function () {
            $scope.loadingDisplay = false;
          });
      };

      $scope.confirmDelete = function () {
        $scope.modalInstance = $modal.open({
          templateUrl: 'partials/confirm-modal.html',
          controller: 'confirmInstance',
          windowClass: 'modal-custom',
          resolve: {
            confirmationMessage: function () {
              return 'Are you sure you want to delete this Display?';
            },
            confirmationButton: function () {
              return 'common.delete-forever';
            }
          }
        });

        $scope.modalInstance.result.then(function () {
          // do what you need if user presses ok
          _delete();
        }, function () {
          // do what you need to do if user cancels
        });
      };

      $scope.save = function () {
        if (!$scope.displayDetails.$valid) {
          $log.error('form not valid: ', $scope.displayDetails.errors);
          return;
        }

        $scope.savingDisplay = true;

        display.update($scope.displayId, $scope.display)
          .then(function (displayId) {
            if (!$scope.displayId) {
              $location.path('displays/' + displayId);
            }
          })
          .then(null, function (e) {
            $scope.submitError = e.message ? e.message : e.toString();
          })
          .finally(function () {
            $scope.savingDisplay = false;
          });
      };

    }
  ]);
