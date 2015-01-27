'use strict';
describe('controller: display details', function() {
  var displayId = 1234;
  beforeEach(module('risevision.displaysApp.controllers'));
  beforeEach(module('risevision.displaysApp.services'));
  beforeEach(module(function ($provide) {
    $provide.service('userState',userState);
    $provide.service('display',function(){
      return {
        update : function(display){
          var deferred = Q.defer();
          if(updateDisplay){
            deferred.resolve(displayId);
          }else{
            deferred.reject('ERROR; could not update display');
          }
          return deferred.promise;
        },
        get: function(displayId) {
          var deferred = Q.defer();
          if(updateDisplay){
            deferred.resolve(displayId);
          }else{
            deferred.reject('ERROR; could not get display');
          }
          return deferred.promise;
        },
        delete: function(displayId) {
          var deferred = Q.defer();
          if(updateDisplay){
            deferred.resolve(displayId);
          }else{
            deferred.reject('ERROR; could not delete display');
          }
          return deferred.promise;
        }
      }
    });
    $provide.service('$routeParams',function(){
      return {
        displayId: 'abcd1234'
      }
    });
    $provide.service('$location',function(){
      return {
        _path : '',
        path : function(path){
          if (path){
            this._path = path;
          }
          return this._path;
        }
      }
    });
    $provide.service('$modal',function(){
      return {
        open : function(obj){
          expect(obj).to.be.truely;
          var deferred = Q.defer();
          if(confirmDelete){
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
  var $scope, userState, $location, updateDisplay, confirmDelete;
  beforeEach(function(){
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
      $controller('displayDetails', {
        $scope : $scope,
        userState : $injector.get('userState'),
        display:$injector.get('display'),
        $modal:$injector.get('$modal'),
        $location : $location,
        $log : $injector.get('$log')});
      $scope.$digest();
    });
  });
  
  beforeEach(function(done) {
    updateDisplay = true;
    
    setTimeout(function(){
      expect($scope.loadingDisplay).to.be.false;
      done();
    },10);
  });

  it('should exist',function(){
    expect($scope).to.be.truely;
    expect($scope.displayId).to.be.truely;

    expect($scope.save).to.be.a('function');
    expect($scope.confirmDelete).to.be.a('function');
  });

  it('should init the correct defaults',function(){
    expect($scope.savingDisplay).to.be.false;
  });

  describe('submit: ',function(){
    it('should return early if the form is invalid',function(){
      $scope.displayDetails = {};
      $scope.displayDetails.$valid = false;
      $scope.save();
    });

    it('should save the display',function(done){
      updateDisplay = true;

      $scope.displayDetails = {};
      $scope.displayDetails.$valid = true;
      $scope.display = {id:123};
      $scope.save();
      expect($scope.savingDisplay).to.be.true;
      setTimeout(function(){
        expect($scope.savingDisplay).to.be.false;
        done();
      },10);
    });

    it('should show an error if fails to update the display',function(done){
      updateDisplay = false;

      $scope.$digest();
      $scope.displayDetails = {};
      $scope.displayDetails.$valid = true;
      $scope.save();
      setTimeout(function(){
        expect($location._path).to.be.empty;
        expect($scope.savingDisplay).to.be.false;
        expect($scope.submitError).to.be.ok;
        done();
      },10);
    });
  });
  
  describe('delete: ',function(){
    beforeEach(function() {
      confirmDelete = false;
    });
    
    it('should return early the user does not confirm',function(){
      $scope.confirmDelete();
      
      expect($scope.loadingDisplay).to.be.false;
      expect($location._path).to.be.empty;
    });
    
    it('should delete the display',function(done){
      confirmDelete = true;
      updateDisplay = true;
      
      $scope.confirmDelete();
      setTimeout(function(){
        expect($scope.loadingDisplay).to.be.false;
        expect($location._path).to.equal('#/');
        done();
      },10);
    });
    
    it('should show an error if fails to delete the display',function(done){
      confirmDelete = true;
      updateDisplay = false;
      
      $scope.confirmDelete();
      setTimeout(function(){
        expect($location._path).to.be.empty;
        expect($scope.loadingDisplay).to.be.false;
        expect($scope.submitError).to.be.ok;
        done();
      },10);
    });
  });

});
