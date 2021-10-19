/* Tradeoff between performance vs consistency

1) using reference appraoch(normalization)  --> consistency
let author = {
    name: "mosh"
}

let course = {
    code: "mt-19",
    author: 'ref-id'
}


2) using embedded document appraoch(denormalization)  --> query performance
let course = {
    code: "mt-19",
    author: {
        name : "mosh" complete properties
    }
}

3) using Hybrid appraoch

let author = {
    name: "mosh"
    50 more properties
}

let course = {
    code: "mt-19",
    author: {
        id: "ref-id",
        name: "mosh"  selected properties
    }
}
================================    Referencing Approach       ================================
*/
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Author'
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name:name, 
    bio:bio, 
    website:website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    // .populate('pathname', 'select fields -unselect fields')
    .populate('author', 'name website -_id')
    .select('name author');
  console.log(courses);
}

//createAuthor('Mosh', 'My bio', 'My Website');
//createCourse('Node Course', '616e7e55e4e6bea76ff083f3');
listCourses();