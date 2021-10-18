const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost/school', { useNewUrlParser: true });

mongoose.connection.once('open', function(){
    console.log("Connection has been made");
}).on('error', function(error){
    console.log("Error while Connecting",error);
})

const studentSchema = new mongoose.Schema({          // Schema defines the structure of the document(table)
    name: String,
    class: String,
    age: Number,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

// Creata a model for that schema to generate records
const Student = mongoose.model("Student", studentSchema);    // write collection name in singular form, returns a class

/*
async function createStudent(){   
    let mosh = new Student({
        name:"ammad",
        class: "Bachelors",
        age:21,
        tags: ["React Front", "Node Backend"],
        isPublished: false
    })

    let result = await mosh.save();
    console.log(result);
}

createStudent();
*/
async function getStudents(){
    let result = await Student
    .find({name:"Mosh"})                    // simple filter 
    //.find({price: { $gt:10 }})            // price greater than 10
    //.find({price: { $gte:10, $lte:20 }})  // prices between 10 and 20
    //.find({price: { $in: [10,20,30] }})   // prices which are 10,20 and 30 only
    .limit(5)                 
    .select({name:1,class:1,tags:1})      // selecting which fields to come
    .sort({name:-1});                     // sort result in ascend(-1) or descend order(1)
    console.log(result)
}

getStudents();

/*
async function getStudents(){
    let result = await Student
    .find()
    .or([{name:"mosh"}, {isPublished:true}])
    .and([{condition 1},{condition 2}])
    console.log(result)
}

Comparision operators
1) eq
2) ne
3) gt
4) gte
5) lt
6) lte
7) in
8) nin (not in)

Logical operators
1) or
2) and

Regular Expressions

Syntax: /pattern/i(incase-sensitive)

Starts with -->  .find({name: /^Mosh/i})
Ends with --> .find({name: /hamedani$/i})
*/
//contains --> .find({name: /.*Mosh.*/i})

