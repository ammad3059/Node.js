const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 125,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required:true,
        maxlength:225,
        trim:true
    },
    age : {
        type: Number,
        min:18,
        default:18
    }
})

const Customer = mongoose.model('Customer', customerSchema);
module.exports.Customer = Customer;
module.exports.customerSchema = customerSchema;