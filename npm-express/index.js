const express = require('express') // loading a module returns a function
const expressObj = express() // returns an object
expressObj.use(express.json())

let mycourses = [
    {id:1, courseName:"Software Eng."},
    {id:2, courseName:"Database Design"},
    {id:3, courseName:"Testing principles"}
]

expressObj.get("/", (req,res)=>{   // endpoint / Route
    res.send("In the Root of the Site!!")
})

expressObj.get("/api/courses", (req,res)=>{  // endpoint / Route
    res.send(mycourses)
})

expressObj.get("/api/courses/:id", (req,res)=>{  // endpoint / Route
    //res.send(req.params.id)   // route param
    var coursefound = mycourses.find(c =>{
        return c.id == parseInt(req.params.id);
    })
    console.log(coursefound);
    if(!coursefound) {res.status(404).send("Requested Course not found!!")}
    else {res.send(coursefound)}
})

expressObj.get("/api/courses/:year/:month", (req,res)=>{  // endpoint / Route
    res.send(req.params)   // route param
})

expressObj.get("/api/posts/:year", (req,res)=>{  // endpoint / Route
    res.send(req.query)   // query param
})


expressObj.post("/api/courses", (req,res)=>{
    let newCourse = {
        id: mycourses.length+1,
        courseName: req.body.courseName
    }
    mycourses.push(newCourse)
    res.send(newCourse)
})


// const port = process.env.PORT || 3000;

expressObj.listen(3000, ()=>{ console.log(`Listening on port 3000..`);})   // create a listening port 
