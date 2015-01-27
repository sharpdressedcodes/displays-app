'use strict';

angular.module('risevision.displaysApp.directives')
  .directive('displayDetails', ['userState', 'display', '$location',
    '$loading', '$modal', '$log', 'COUNTRIES', 'REGIONS_CA', 'REGIONS_US',
    'TIMEZONES',
    function (userState, display, $location, $loading, $modal, $log,
      COUNTRIES, REGIONS_CA, REGIONS_US, TIMEZONES) {
      return {
        restrict: 'E',
        scope: {
          displayId: '@'
        },
        templateUrl: 'partials/display-details.html',
        link: function ($scope) {
          $scope.countries = COUNTRIES;
          $scope.regionsCA = REGIONS_CA;
          $scope.regionsUS = REGIONS_US;
          $scope.timezones = TIMEZONES;
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
            //load the ticket based on the url param
            $scope.loadingDisplay = true;

            display.get($scope.displayId)
              .then(function (result) {
                $scope.display = result.item;
              })
              .finally(function () {
                $scope.loadingDisplay = false;
              });
          };

          var _delete = function () {
            //load the ticket based on the url param
            $scope.loadingDisplay = true;

            display.delete($scope.displayId)
              .then(function (result) {
                $scope.display = result.item;

                $location.path('#/');
              })
              .finally(function () {
                $scope.loadingDisplay = false;
              });
          };

          $scope.confirmDelete = function () {
            $scope.modalInstance = $modal.open({
              templateUrl: 'partials/delete-modal.html',
              controller: 'deleteInstance',
              windowClass: 'modal-custom',
              resolve: {
                confirmationMessage: function () {
                  return 'Are you sure you want to delete this Display?';
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

          $scope.save = function (id, comment, toggleStatus) {
            if (!$scope.displayDetails.$valid) {
              $log.error('form not valid: ', $scope.displayDetails.errors);
              return;
            }

            $scope.savingDisplay = true;

            display.save($scope.displayId, $scope.display)
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

        } //link()
      };
    }
  ]);
