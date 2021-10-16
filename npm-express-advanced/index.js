const { request, response } = require("express")
const express = require("express")
const Joi = require("Joi")
const logger = require("./logger")
const app = express()

app.use(express.urlencoded({extended:true}))  // for urlencoded payloads
app.use(express.static("public"));  // for static files
app.use(logger)


let courses = [{
    id:1,
    courseName:"Database"
}]

app.post("/api/courses", (request, response)=>{
    const {error} = validateCourse(request.body)
    if(error) return response.status(400).send(error)

    let newCourse = {
        id:courses.length+1,
        courseName: request.body.courseName
    }
    courses.push(newCourse)
    response.send(courses)
})

app.listen(3000, ()=>{console.log("Listening on port 3000...");})

function validateCourse(course){
    const schema = Joi.object({
        courseName: Joi.string().min(4).required()
    })
    return schema.validate(course)
}