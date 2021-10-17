const { request, response } = require("express")
const express = require("express")
const debug = require("debug")("expressApp")  // returns a function , second is the name of debugger used im cmd
const Joi = require("Joi")                    // returns a class
const morgan = require("morgan")              // returns a function 
const config = require("config")              // returns a function 
const logger = require("./middleware/logger")
const { render } = require("pug")
const courses = require('./routes/courses')
const app = express()

app.use(express.urlencoded({extended:true}))  // for urlencoded payloads
app.use(express.static("public"))  // for static files

if(app.get("env")==='development'){
app.use(morgan("tiny")) // third-party middleware
}

app.set("view engine", "pug")
app.set("views", "./views")  // default

app.use("/api/courses", courses);
app.use(logger)  // custom middleware

app.get("/", (req,res)=>{
    res.render("index", {title:"Pug title", message:"Just Started with html templates on node with Pug"})
})

debug(`configuration settings name: ${config.name}`);
debug(`configuration settings host: ${config.mail.hostname}`);

console.log(`By using Global varible process: ${process.env.NODE_ENV}`);  // set NODE_ENV=production
console.log(`by using app: ${app.get("env")}`);  // by default development

app.listen(3000, ()=>{console.log("Listening on port 3000...");})

