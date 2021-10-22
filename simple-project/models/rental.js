const mongoose = require('mongoose')
const { customerSchema } = require('./customer')
const { genreSchema } = require("./genre")
const { movieSchema } = require("./movie")

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                maxlength: 125,
                lowercase: true
            },
            email: {
                type: String
            }
        }),
        required: true
    },

    movie:{
        required: true,
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                maxlength: 225
            },
            price: {
                type: Number,
                min:10,
                get: v => Math.round(v),    
                set: v => Math.round(v)
            },

            dateOut:{
                type: Date,
                default: Date.now
            },
            dateReturned: {
                type: Date
            }
        })
    }
})


const Rental = mongoose.model("Rental", rentalSchema);
exports.Rental = Rental;