'use strict';
describe('service: display:', function() {
  beforeEach(module('risevision.displaysApp.services'));
  beforeEach(module(function ($provide) {
    $provide.service('$q', function() {return Q;});
    $provide.service('userState',function(){
      return {
        getAccessToken : function(){
          return{access_token: 'TEST_TOKEN'};
        },
        getSelectedCompanyId : function(){
          return 'TEST_COMP_ID';
        },
        getCopyOfSelectedCompany : function(){
          return {
            name : 'TEST_COMP',
            id : 'TEST_COMP_ID'
          }
        },
        getCopyOfProfile : function(){
          return {
            firstName : 'first',
            lastName : 'lastName',
            telephone : '123',
            email : 'foo@bar'
          };
        },
        _restoreState:function(){}
      }
    });

    $provide.service('coreAPILoader',function () {
      return function(){
        var deferred = Q.defer();
                
        deferred.resolve({
          display: {
            list: function(obj){
              expect(obj).to.be.ok;

              var def = Q.defer();
              if (returnList) {
                def.resolve({
                  result : {
                    nextPageToken : 1,
                    items : [{}]
                  }
                });
              } else {
                def.reject("API Failed");
              }
              return def.promise;
            }
          }
        });
        return deferred.promise;
      };
    });

  }));
  var display, returnList;
  beforeEach(function(){
    inject(function($injector){
      returnList = true;
      display = $injector.get('display');
    });
  });

  it('should exist',function(){
    expect(display).to.be.truely;
    expect(display.list).to.be.a('function');
  });
  
  describe('list:',function(){
    it('should return a list of displays',function(done){
      display.list({})
      .then(function(result){
        expect(result).to.be.truely;
        expect(result.items).to.be.an.array;
        expect(result.items).to.have.length.above(0);
        done();
      })
      .then(null,done);
    });
    
    it("should handle failure to get list correctly",function(done){
      returnList = false;
      
      display.list({})
      .then(function(displays) {
        done(displays);
      })
      .then(null, function(error) {
        expect(error).to.deep.equal('API Failed');
        done();
      })
      .then(null,done);
    });
  });

});
