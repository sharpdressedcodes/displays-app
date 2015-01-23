'use strict';

angular.module('risevision.displaysApp.directives')
  .directive('displaysList', ['userState', 'display', 'BaseList', '$location',
    '$loading',
    function (userState, display, BaseList, $location, $loading) {

      return {
        restrict: 'E',
        $scope: {},
        templateUrl: 'partials/displays-list.html',
        link: function ($scope) {
          var DB_MAX_COUNT = 20; //number of records to load at a time

          $scope.displays = new BaseList(DB_MAX_COUNT);

          $scope.search = angular.extend({
            sortBy: 'name',
            count: DB_MAX_COUNT,
            reverse: false
          }, $location.search());

          $scope.$watch('loadingDisplays', function (loading) {
            if (loading) {
              $loading.start('displays-list-loader');
            } else {
              $loading.stop('displays-list-loader');
            }
          });

          var load = function () {
            if (!$scope.displays.list.length || !$scope.displays.endOfList &&
              $scope.displays.cursor) {
              $scope.loadingDisplays = true;

              display.list($scope.search, $scope.displays.cursor)
                .then(function (result) {
                  $scope.displays.add(result.items, result.cursor);
                })
                .then(null, function (e) {
                  $scope.error =
                    'Failed to load displays. Please try again later.';
                })
                .finally(function () {
                  $scope.loadingDisplays = false;
                });
            }
          };
          load();

          $scope.sortBy = function (cat) {
            $scope.displays.clear();

            if (cat !== $scope.search.sortBy) {
              $scope.search.sortBy = cat;
            } else {
              $scope.search.reverse = !$scope.search.reverse;
            }

            load();
          };

          $scope.doSearch = function () {
            $scope.displays.clear();

            load();
          };

          $scope.handleScroll = function (event, isEndEvent) {
            // $log.debug(event.target.scrollTop + ' / ' + event.target.scrollHeight + ' / ' + isEndEvent);
            if (isEndEvent) {
              if ((event.target.scrollHeight - event.target.clientHeight -
                event.target.scrollTop) < 20) {
                //load more rows if less than 20px left to the bottom
                load();
              }
            }
          };

          $scope.$watch(userState.getSelectedCompanyId, function (newID,
            oldID) {
            if (newID && oldID && newID !== oldID) {
              //changed company, force a reload of the ticket list
              load();
            }
          });

          $scope.navigate = function (path, event) {
            event.preventDefault();

            $location.path(path);
          };
        } //link()
      };
    }
  ]);
