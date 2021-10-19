const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,       // if want specfic property required define it here using schemaType Object
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author:{
    type: authorSchema,
    required:true        // if want all required
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function updateCourse(course_id) {
  
  await Course.updateOne({_id:course_id},{             // if want to remove author use $unset and property to empty string
    $set:{
      'author.name':"John smith",
      'author.website':'mysite.com'
    }
  });
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

updateCourse('616e87e574a6fe976928cc67');
//createCourse('Node Course', new Author({ name: 'Mosh', bio:"biography here", website: "my website link here" }));
