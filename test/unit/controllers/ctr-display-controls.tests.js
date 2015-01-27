'use strict';
describe('controller: display controls', function() {
  var displayId = 1234;
  beforeEach(module('risevision.displaysApp.controllers'));
  beforeEach(module('risevision.displaysApp.services'));
  beforeEach(module(function ($provide) {
    $provide.service('userState',userState);
    $provide.service('display',function(){
      return {
        restart: function(displayId) {
          var deferred = Q.defer();
          if(updateDisplay){
            deferred.resolve(displayId);
          }else{
            deferred.reject('ERROR; could not restart display');
          }
          return deferred.promise;
        },
        reboot: function(displayId) {
          var deferred = Q.defer();
          if(updateDisplay){
            deferred.resolve(displayId);
          }else{
            deferred.reject('ERROR; could not reboot display');
          }
          return deferred.promise;
        }
      }
    });
    $provide.service('$modal',function(){
      return {
        open : function(obj){
          expect(obj).to.be.truely;
          var deferred = Q.defer();
          if(confirmResponse){
            deferred.resolve();
          }else{
            deferred.reject();
          }
          
          return {
            result: deferred.promise
          };
        }
      }
    });
  }));
  var $scope, userState, $location, updateDisplay, confirmResponse;
  beforeEach(function(){
    updateDisplay = true;
    
    userState = function(){
      return {
        getSelectedCompanyId : function(){
          return 'some_company_id';
        },
        _restoreState : function(){

        },
        isSubcompanySelected : function(){
          return true;
        }
      }
    };
    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $location = $injector.get('$location');
      $controller('displayControls', {
        $scope : $scope,
        userState : $injector.get('userState'),
        display:$injector.get('display'),
        $modal:$injector.get('$modal'),
        $log : $injector.get('$log')});
      $scope.$digest();
    });
  });
  
  it('should exist',function(){
    expect($scope).to.be.truely;

    expect($scope.restart).to.be.a('function');
    expect($scope.reboot).to.be.a('function');
  });

  describe('restart: ',function(){
    xit('should return early the user does not confirm',function(){
      $scope.restart('1234');
      
      expect($scope.controlsInfo).to.be.false;
    });
    
    it('should restart the display',function(done){
      confirmResponse = true;
      updateDisplay = true;
      
      $scope.restart('1234');
      setTimeout(function(){
        expect($scope.controlsInfo).to.be.ok;
        expect($scope.controlsError).to.not.be.ok;
        done();
      },10);
    });
    
    it('should show an error if fails to restart the display',function(done){
      confirmResponse = true;
      updateDisplay = false;
      
      $scope.restart('1234');
      setTimeout(function(){
        expect($scope.controlsInfo).to.not.be.ok;
        expect($scope.controlsError).to.be.ok;
        done();
      },10);
    });
  });
  
  describe('reboot: ',function(){
    xit('should return early the user does not confirm',function(){
      $scope.restart('1234');
      
      expect($scope.controlsInfo).to.be.false;
    });
    
    it('should restart the display',function(done){
      confirmResponse = true;
      updateDisplay = true;
      
      $scope.restart('1234');
      setTimeout(function(){
        expect($scope.controlsInfo).to.be.ok;
        expect($scope.controlsError).to.not.be.ok;
        done();
      },10);
    });
    
    it('should show an error if fails to restart the display',function(done){
      confirmResponse = true;
      updateDisplay = false;
      
      $scope.restart('1234');
      setTimeout(function(){
        expect($scope.controlsInfo).to.not.be.ok;
        expect($scope.controlsError).to.be.ok;
        done();
      },10);
    });
  });

});
