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

/*
async function updateCourse(id){
    // query first approach
    // get elementby id
    const c = await Course.findById(id)
    if(!c) return

    // update
    c.set({
        name:"Another name",
        isTeaching:false
    })
    // save
    let updated = await c.save()
    console.log(updated);

}
updateCourse("616d34e25d3d0e2198d74e7b");


async function updateCourse(id) {
    // update first approach
    // update directly in database
    const updated = await Course.update({ _id: id }, {    // it doesnot returns the updated obj
        $set: {
            name: "Calculus",
            isTeaching: true
        }
    })

    console.log(updated);

}
updateCourse("616d34e25d3d0e2198d74e7b");
*/

async function updateCourse(id) {
    // update first approach
    // update directly in database
    const updated = await Course.findByIdAndUpdate(id, {    // if obj want use findbyidandupdate also use new param
        $set: {
            name: "Differential Equations",
            isTeaching: false
        }
    }, { new: true})

    console.log(updated);

}
updateCourse("616d34e25d3d0e2198d74e7b");