const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises', {useNewUrlParser: true});

mongoose.connection.once('open', function(){
    console.log("Connection has been established!!");
}).on('error', function(error){
    console.log("Error while Connecting!!", error);
})

const courseSchema = new mongoose.Schema({
    tags: [String],
    name: String,
    author: String,
    isPublished:Boolean,
    price: Number,
    date:{ type:Date, default:Date.now }
});

const Course = mongoose.model("Course", courseSchema);

/*
async function getCourses(){                         // Exercise 1
    let result = await Course
    .find()
    .and([{ isPublished:true},{tags: {$in:['backend']}}])
    .sort({name:1})
    .select({name:1, author:1})

    console.log("Fetched result is-->", result);
}
getCourses();

async function getCourses(){                             // Exercise 2
    let result = await Course
    .find({isPublished:true})
    .sort('-price')
    .select('name author price')

    console.log("Fetched result is-->", result);
}
getCourses();
*/

async function getCourses(){                             // Exercise 3
    let result = await Course
    .find({isPublished:true})
    .or([{price:{$gte:15}},{name: /.*by.*/i}])

    console.log("Fetched result is-->", result);
}
getCourses();