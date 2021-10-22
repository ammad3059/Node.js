const express = require('express')
const router = express.Router()
const Joi = require("Joi")
const Fawn = require("fawn")
const mongoose = require('mongoose')
const { Customer } = require('../models/customer')
const { Movie } = require('../models/movie')
const { Rental } = require('../models/rental')

Fawn.init('mongodb://localhost/vidly');

router.get('/', async (req, res) => {
    let result = await Rental.find()
    res.send(result)
})

router.post('/', async (req, res) => {
    const { error } = validateRental(req.body)
    if (error) return res.status(400).send(error.details)

    let customer = await Customer.findById(req.body.customerId)
    if (!customer) return res.status(400).send("Customer not matched!!")

    let movie = await Movie.findById(req.body.movieId)
    if (!movie) return res.status(400).send("Movie not found!!")

    let newrental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            email: customer.email
        },
        movie: {
            _id: movie._id,
            name: movie.name,
            price: movie.price,
            dateReturned: new Date(req.body.dateReturned)
        }
    })

    try {
        
        // without two-phase commit
        const savedrental = await newrental.save()
        res.send(savedrental)

        movie.numbersInStock--;
        await movie.save();

        /*
        // Making a task for transaction/two-phase commit
        new Fawn.Task()
            .save('rentals', newrental)
            .update('movies', { _id:movie._id}, {
                $inc: { numbersInStock: -1}
            })
            .run();

        res.send(newrental)
        */
    }
    catch (err) {
        res.status(500).send("Internal Error!");
    }
})

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
        dateReturned: Joi.date()
    })
    return schema.validate(rental)

}
module.exports = router;
