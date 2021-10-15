/*
function logging(message){
    console.log(message);
}

console.log(module);
module.exports.logservice = logging;   // making it accessible outside using object
// module.exports = logging;           // making it accessible outside directly with a function
*/

const EventEmitter = require("events")

class Logger extends EventEmitter{
    logmessage(message){
        console.log(message)
        this.emit("myEmitter", { id: 2, url: "http://alibala.com/"})
    }
}

module.exports = Logger;