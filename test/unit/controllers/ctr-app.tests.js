'use strict';
describe('controller: app', function() {
  beforeEach(module('risevision.displaysApp.controllers'));
  var $scope;
  beforeEach(function(){
    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $controller('AppCtrl', {
        $scope: $scope,
        $location : function(){},
      });
      $scope.$digest();
    });
  });
  it('should exist',function(){
    expect($scope).to.be.truely;
    expect($scope.navOptions).to.be.truely;
    expect($scope.navSelected).to.be.truely;
  });
});
