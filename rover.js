const Message = require('./message.js')
const Command = require('./command.js')


class Rover {
  constructor(position) {
    this.position = position
    this.mode = "NORMAL"
    this.generatorWatts = 110
  }
  receiveMessage(messageObject) {
    let response = {}
    response["message"] = messageObject.name
    response["results"] = []
    if (messageObject.commands) {
    for (let i = 0; i < messageObject.commands.length; i++) {
      let resultObject = {
        completed:true,
        }
      if (messageObject.commands[i].commandType === "STATUS_CHECK") {
        // response.results[i].completed = true
        let roverStatus = {}
        roverStatus["mode"] = this.mode;
        roverStatus["generatorWatts"] = this.generatorWatts;
        roverStatus["position"] = this.position;
        resultObject["roverStatus"] = roverStatus
        response.results.push(resultObject);
        console.log(response)
      } else if (messageObject.commands[i].commandType === "MODE_CHANGE") {
        this.mode = messageObject.commands[i].value;
        response.results.push(resultObject);
      } else if (messageObject.commands[i].commandType === "MOVE") {
        if (this.mode === "LOW_POWER") {
          resultObject.completed = false
          response.results.push(resultObject);
        } else {
          this.position = messageObject.commands[i].value;
          response.results.push(resultObject);
      } 
      }
    }
    }
    return response
  }
}      
   
module.exports = Rover;
// results: requires a loop