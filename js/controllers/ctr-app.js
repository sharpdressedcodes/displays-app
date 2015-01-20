'use strict';

angular.module('risevision.displaysApp.controllers')
  .controller('AppCtrl', ['$scope', '$location',
    function ($scope, $rootScope, $location) {
      $scope.navOptions = [{
        title: 'Displays',
        link: '#/',
        states: ['root.common.displays']
      }, {
        title: 'RVA',
        link: 'http://rva.risevision.com',
        target: '_blank'
      }, {
        title: 'Community',
        link: 'http://community.risevision.com',
        target: '_blank'
      }];
      $scope.navSelected = 'root.common.displays';
    }
  ]); //ctr
