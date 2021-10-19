const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/school', { useNewUrlParser: true });
mongoose.connection.once('open', function () {
    console.log("Connection established");
}).on('error', function () {
    console.log("Error while connecting to mongoDb..");
})

const courseSchema = new mongoose.Schema({
    name: String,
    code: String,
    tags: [String],
    isTeaching: Boolean
});

const Course = mongoose.model("Course", courseSchema);

async function removeCourse(id) {
    // delete first approach
    // remove directly from a database 
    // 1) approach
    //const result = await Course.deleteOne({_id:id})  // returns nothing
    //console.log(result);

    // 2) approach
    const deletedOne = await Course.findByIdAndRemove(id)
    console.log(deletedOne);

}
removeCourse("616d34e25d3d0e2198d74e7b");