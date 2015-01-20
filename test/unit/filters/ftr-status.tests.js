'use strict';
describe('filter: status', function() {
  beforeEach(module('risevision.displaysApp.filters'));
  var status;
  beforeEach(function(){
    inject(function($filter){
      status = $filter('status');
    });
  });

  it('should exist',function(){
    expect(status).to.be.truely;
  });

  it('should default to notinstalled if no status provide',function(){
    expect(status()).to.equal('notinstalled');
  });
    
  it('should show blocked display',function() {
    var display = {
      blockExpiryDate: 'Jan1'
    }
    
    expect(status(display)).to.equal("blocked");
  });

  it('should show offline display',function() {
    var display = {
      lastActivityDate: 'Jan1',
      playerStatus: 0
    };
    expect(status(display)).to.equal("offline");
  });
  
  it('should show online display',function() {
    var display = {
      lastActivityDate: 'Jan1',
      playerStatus: 0,
      connected: 1
    };
    expect(status(display)).to.equal("online");
  });
  
  it('should show error display',function() {
    var display = {
      lastActivityDate: 'Jan1',
      playerStatus: 0,
      connected: 0
    };
    expect(status(display)).to.equal("offline");
  });
});
