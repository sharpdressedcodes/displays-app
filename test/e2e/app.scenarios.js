'use strict';


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;
browser.driver.manage().window().setSize(1024, 768);

describe("Displays App", function() {
  this.timeout(2000);// to allow for protactor to load the seperate page

  beforeEach(function (){
    browser.get("/index.html");//have special e2e page?
  });

  it('should load',function(){
    expect(element(by.css(".displays-app")).isPresent()).
      to.equal.true;
  });
});
