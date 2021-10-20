//=================================  Working with array of sub-documents =============================

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },       // if want specfic property required define it here using schemaType Object
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: {
        type: [authorSchema]
        //required:true        // if want all required here
    }
}));

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

createCourse('Node Course', [
    new Author({ name: 'Mosh', bio: "biography here", website: "my website link here" }),
    new Author({ name: "Mosh hamedani" }),
    new Author({ name: 'Jones', bio: "JS Expert"})
]);


async function addAuthor(courseId,author){
    let course = await Course.findById(courseId);
    if (!course) return 
    course.authors.push(author)
    let newres = await course.save()
    console.log(newres);
}
addAuthor('616fbe522cca138408a03a34', new Author({ name: "Baby jones" }));

async function removeAuthor(courseId,authorId){
    let course = await Course.findById(courseId);
    if (!course) return 
    const auth = course.authors.id(authorId)
    auth.remove();
    let newres = await course.save()
    console.log(newres);
}

removeAuthor('616fbe522cca138408a03a34', '616fbe522cca138408a03a32');