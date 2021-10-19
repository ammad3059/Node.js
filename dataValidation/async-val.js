const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/school');

mongoose.connection.once('open', function () {
    console.log("Connected to School database");
}).on('error', function (err) {
    console.log("Error: ", err);
})

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4, maxlength: 20 },
    category: { type: String, required: true, enum: ['adventure', 'war', 'history', 'science fiction'] },
    tags: {
        type: Array,
        validate: {
            isAsync: true,                       // Async validation for calling API, reading file or database 
            validator: function (value,callback) {
                // async work
                setTimeout(() => {
                    const result = value && value.length > 0;
                    console.log(result);
                    callback(result);
                }, 1000)
            },
            message: "A tag must have atleast one value"
        }
    },
    author: { type: String, required: true, minlength: 4, maxlength: 20 },
    isPublished: Boolean,
    price: { type: Number, required: function () { return this.isPublished } }
})

const Book = mongoose.model("Book", bookSchema);

async function createBook() {
    try {
        const book1 = new Book({
            name: "History and war",
            author: "Anas bekam",
            category: 'history',
            tags: null,
            isPublished: true,
            price: 200
        })
        let result = await book1.save()
        console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
    }
}
createBook();