const assert = require('assert');
const Command = require('../command.js');

describe("Command class", function() {

  it("Test 1) throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {message: 'Command type required.'}
    );
  });
  
  it("Test 2) constructor sets commandType", function(){
    let testCommandType = new Command("testing")
    assert.strictEqual(testCommandType["commandType"],"testing");
  })

  it("Test 3) constructor sets a value pass in as the 2nd argument", function(){
    let testValue = new Command("testing", "testValue")
    assert.strictEqual(testValue["value"], "testValue");
  })
});