const mongoose = require('mongoose')
const {genreSchema} = require('./genre')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 125,
        lowercase: true,
        trim: true
    },

    genre: {
        type: genreSchema,
        required:true
    },

    numbersInStock: {
        type: Number,
        min:0
    },

    price: {
        type: Number,
        min:10,
        get: v => Math.round(v),    
        set: v => Math.round(v)
    }
})

const Movie = mongoose.model('Movie', movieSchema);
module.exports.Movie = Movie;