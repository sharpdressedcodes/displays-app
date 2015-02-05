'use strict';

angular.module('risevision.displaysApp.controllers')
  .controller('AppCtrl', ['$scope', '$location',
    function ($scope, $rootScope, $location) {
      $scope.navOptions = [{
        title: 'Displays',
        link: '#/',
        states: ['root.common.displays']
      }, {
        title: 'Help',
        link: 'http://help.risevision.com/#/user/display/what-is-a-display',
        target: '_blank'
      }];
      $scope.navSelected = 'root.common.displays';
    }
  ]); //ctr
