const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/school', { useNewUrlParser: true });
mongoose.connection.once('open', function(){
    console.log("Connection established");
}).on('error', function(){
    console.log("Error while connecting to mongoDb..");
})

const courseSchema = new mongoose.Schema({
    name:String,
    code: String,
    tags: [String],
    isTeaching: Boolean
});

const Course = mongoose.model("Course", courseSchema);
/*
async function createCourse(){
    const maths = new Course({
        name: "English",
        code: "SE-567",
        tags: ["Speaking", "Writing"],
        isTeaching: true
    })

    let res = await maths.save();
    console.log(res);
}
createCourse();
*/

async function getCourse(){
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    let result = await Course
    .find()
    .skip((pageNumber-1)*pageSize)        // it is used for pagination
    .limit(pageSize)
    console.log(result);
}
getCourse();

