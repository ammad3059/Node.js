const express = require('express')
const { render } = require("pug")
const router = express.Router()

let courses = [{
    id:1,
    courseName:"Database"
}]

router.get("/", (req,res)=>{
    res.render("index", {title:"Pug title", message:"Just Started with html templates on node with Pug!!"})
})

router.post("/", (request, response)=>{
    const {error} = validateCourse(request.body)
    if(error) return response.status(400).send(error)

    let newCourse = {
        id:courses.length+1,
        courseName: request.body.courseName
    }
    courses.push(newCourse)
    response.send(courses)
})

function validateCourse(course){
    const schema = Joi.object({
        courseName: Joi.string().min(4).required()
    })
    return schema.validate(course)
}

module.exports = router;