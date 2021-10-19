const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/school');

mongoose.connection.once('open', function () {
    console.log("Connected to School database");
}).on('error', function (err) {
    console.log("Error: ", err);
})

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20,
        lowercase: true,
        trim: true
    },
    category: { type: String, required: true, enum: ['adventure', 'war', 'history', 'science fiction'] },  // Schema type object
    tags: {
        type: Array,
        validate: {
            validator: function (value) {
                return value && value.length > 0;                  /// Custom validation 
            },
            message: "A tag must have atleast one value"
        }
    },
    author: { type: String, required: true, minlength: 4, maxlength: 20 },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished },
        min: 10,
        max: 100,
        get: v => Math.round(v),    // called when reading a value  custom
        set: v => Math.round(v)     // called when adding a value   custom
    }
})

const Book = mongoose.model("Book", bookSchema);

async function createBook() {
    try {
        const book1 = new Book({
            name: "History and war",
            author: "Anas bekam",
            category: 'history',
            tags: ['pak', 'ind'],
            isPublished: true,
            price: 20.45
        })
        let result = await book1.save()
        console.log(result);
    }
    catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);      // Validation errors
        }
    }
}
createBook();