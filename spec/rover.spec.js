const assert = require('assert');
const Rover = require('../rover.js');
const Message = require(`../message.js`);
const Command = require(`../command.js`);

describe("Rover class", function(){

  it("Test 7) constructor sets position and default values for mode and generatorWatts", function(){
    let testRover = new Rover(777)
    assert.strictEqual(testRover["position"], 777);
    assert.strictEqual(testRover["mode"], "NORMAL");
    assert.strictEqual(testRover["generatorWatts"], 110);
  });

  it("Test 8) response returned by receiveMessage contains name of message", function () {
    let testRover = new Rover(333)
    let testMessage = new Message("Matice")
    assert.strictEqual(testRover.receiveMessage(testMessage).message, "Matice");
  });

  it("Test 9) response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let testRover = new Rover(111)
    let testMessage = new Message("Matice", [new Command("STATUS_CHECK"), new Command("STATUS_CHECK")])
    assert.strictEqual(testRover.receiveMessage(testMessage).results.length, 2)
  })

  it("Test 10) responds correctly to status check command", function() {
    let testRover = new Rover (888)
    let testMessage = new Message("Matice", [new Command("STATUS_CHECK")])
    assert.deepStrictEqual(testRover.receiveMessage(testMessage).results[0].roverStatus,{generatorWatts: 110, mode: 'NORMAL', position: 888})
  })

  it("Test 11) responds correctly to mode change command", function() {
    let testRover = new Rover (999)
    let testMessage = new Message("Matice", [new Command("MODE_CHANGE","LOW_POWER")])
    let testReceiveMessage = testRover.receiveMessage(testMessage)
    assert.strictEqual(testRover.mode,"LOW_POWER")
  })

  it("Test 12) responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let testRover = new Rover (737)
    let testMessage = new Message("Matice", [new Command("MODE_CHANGE","LOW_POWER"), new Command("MOVE", 0)])
    let testReceiveMessage = testRover.receiveMessage(testMessage)
    assert.strictEqual(testReceiveMessage.results[1].completed, false)
  })

  it("Test 13) responds with position for move command", function() {
    let testRover = new Rover (123)
    let testMessage = new Message("Matice", [new Command("MOVE", 321)])
    let testReceiveMessage = testRover.receiveMessage(testMessage)
    assert.strictEqual(testRover.position, 321)
  })

  it("responds to TA message & commands", function() {
   let rover = new Rover(100);
   let commands = [
      new Command('MOVE', 4321),
      new Command('STATUS_CHECK'),
      new Command('MODE_CHANGE', 'LOW_POWER'),
      new Command('MOVE', 3579),
      new Command('STATUS_CHECK')
   ];
   let message = new Message('TA power', commands);
   let response = rover.receiveMessage(message);
   assert.strictEqual(response.message,'TA power');
   assert.strictEqual(response.results[0].completed, true);
   assert.strictEqual(response.results[1].roverStatus.position, 4321);
   assert.strictEqual(response.results[2].completed, true);
   assert.strictEqual(response.results[3].completed, false);
   assert.strictEqual(response.results[4].roverStatus.position, 4321);
   assert.strictEqual(response.results[4].roverStatus.mode, 'LOW_POWER');
   assert.strictEqual(response.results[4].roverStatus.generatorWatts, 110);
  });


});