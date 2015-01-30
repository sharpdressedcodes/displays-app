'use strict';
describe('service: timeParser:', function() {
  beforeEach(module('risevision.displaysApp.services'));

  var timeParser;
  beforeEach(function(){
    inject(function($injector){
      timeParser = $injector.get('timeParser');
    });
  });

  it('should exist',function(){
    expect(timeParser).to.be.truely;
    expect(timeParser).to.be.a('function');
  });
  
  describe('parseTime:',function(){
    it('should parse 3:30',function(){
      var time = timeParser("03:30");
      
      expect(time).to.be.truely;
      expect(time.getHours()).to.equal(3);
      expect(time.getMinutes()).to.equal(30);
    });
    it('should parse 16:05',function(){
      var time = timeParser("16:05");
      
      expect(time).to.be.truely;
      expect(time.getHours()).to.equal(16);
      expect(time.getMinutes()).to.equal(5);
    });
    it('should parse a random string as 0:00',function(){
      var time = timeParser("as:df");

      expect(time).to.be.truely;
      expect(time.getHours()).to.equal(0);
      expect(time.getMinutes()).to.equal(0);      
    });
    it('should parse a undefined as 0:00',function(){
      var time = timeParser();
      
      expect(time).to.be.truely;
      expect(time.getHours()).to.equal(0);
      expect(time.getMinutes()).to.equal(0);      
    });
  });

});
