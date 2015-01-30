'use strict';
describe('controller: display add', function() {
  var displayId = 1234;
  beforeEach(module('risevision.displaysApp.controllers'));
  beforeEach(module('risevision.displaysApp.services'));
  beforeEach(module(function ($provide) {
    $provide.service('userState',userState);
    $provide.service('display',function(){
      return {
        _display: {},
        add : function(display){
          var deferred = Q.defer();
          if(updateDisplay){
            this._display = display;
            deferred.resolve(displayId);
          }else{
            deferred.reject('ERROR; could not create display');
          }
          return deferred.promise;
        }
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
  }));
  var $scope, userState, $location, updateDisplay, confirmDelete;
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
      $controller('displayAdd', {
        $scope : $scope,
        userState : $injector.get('userState'),
        display:$injector.get('display'),
        $location : $location,
        $log : $injector.get('$log')});
      $scope.$digest();
    });
  });
  
  it('should exist',function(){
    expect($scope).to.be.truely;

    expect($scope.save).to.be.a('function');
  });

  it('should init the correct defaults',function(){
    expect($scope.display).to.be.truely;
    expect($scope.display).to.deep.equal({
      'width': 1920,
      'height': 1080,
      'status': 1,
      'restartEnabled': true,
      'restartTime': '02:00',
      'useCompanyAddress': true
    });
  });

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

  it('should show an error if fails to create display',function(done){
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
