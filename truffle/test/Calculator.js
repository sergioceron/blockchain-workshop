var Calculator = artifacts.require("Calculator");

contract('Calculator', function() {
  it("should make a sum 5+6=11", function() {
    return Calculator.deployed().then(function(instance) {
      return instance.sum.call(5,6);
    }).then(function(result){
      return assert.equal(result, 11);
    });
  });
  it("should make a substract 5-6=-1", function() {
    return Calculator.deployed().then(function(instance) {
      return instance.sum.call(5,-6);
    }).then(function(result){
      return assert.equal(result, -1);
    });
  });
  it("should make a multiplication 5*6=30", function() {
    return Calculator.deployed().then(function(instance) {
      return instance.mult.call(5,6);
    }).then(function(result){
      return assert.equal(result, 30);
    });
  });
  it("should make a div 5/6=0", function() {
    return Calculator.deployed().then(function(instance) {
      return instance.div.call(5,6);
    }).then(function(result){
      return assert.equal(result, 0);
    });
  });
  it("should make a pow 5^6=15625", function() {
    return Calculator.deployed().then(function(instance) {
      return instance.pow.call(5,6);
    }).then(function(result){
      return assert.equal(result, 15625);
    });
  });
  it("should make a factorial 5!=120", function() {
    return Calculator.deployed().then(function(instance) {
      return instance.fact.call(5);
    }).then(function(result){
      return assert.equal(result, 120);
    });
  });
});
