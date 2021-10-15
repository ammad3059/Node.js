/*
// Events Module 
const EventEmitter = require('events')   // returns a class
const emitter = new EventEmitter();

// Register a listener

emitter.on("myemitter",(e)=>{
    console.log("Emitter Listener Called!!", e);
})

// emitter.addListener another way

// Raise an event

emitter.emit("myemitter", {id:1, url:"https://mysite.com/"});
*/

const Logger = require('./logger')
let loggerObj = new Logger();

loggerObj.on("myEmitter", (e)=>{
    console.log("Emitter Listener Called!!", e);
})

loggerObj.logmessage("Extending the Events Topics..")

