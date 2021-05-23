const assert = require('assert');
const Message = require('../message.js');

describe("Message class", function(){

  it("Test 4) throws error if a name is NOT passed into the constructor as the first parameter", function(){
    assert.throws(
      function() {
        new Message();
      },
      {message: "Name required."}
    );
  });

  it("Test 5) constructor sets name", function(){
    let testName = new Message("Matice")
    assert.strictEqual(testName["name"], "Matice");
  })

  it("Test 6) contains a commands array passed into the constructor as 2nd argument", function() {
    let testCommandsArray = new Message("Matice", ["start", "stop"])
    assert.deepStrictEqual(testCommandsArray["commands"], ["start", "stop"]);
  })
});