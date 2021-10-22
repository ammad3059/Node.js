const express = require('express')
const Joi = require('Joi')
const {Genre} = require('../models/genre')
const {Movie} = require('../models/movie')
const router = express.Router()

router.get('/', async (req,res)=>{
    const result = Movie.find()
    res.send(result)
})

router.post('/', async(req,res)=>{
    const {error} = validateMovie(req.body)
    if (error) return res.status(400).send(error.details)

    let newMovie = new Movie({
        name: req.body.name,
        genre: new Genre({'category': req.body.genre}),
        numbersInStock: req.body.instock,
        price: req.body.price
    })
    try{
        let usersave = await newMovie.save()
        res.send(usersave)
    }
    catch(err){
        res.status(400).send(err)
    }
    
})

function validateMovie(movie){
    const schema = Joi.object({
        name : Joi.string().required().min(4).max(125),
        genre : Joi.objectId().required(),
        instock: Joi.number().min(0),
        price: Joi.number().min(10)
    })

    return schema.validate(movie)
}
module.exports = router;
