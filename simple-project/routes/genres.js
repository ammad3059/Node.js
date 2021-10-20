const express = require('express')
const {Genre} = require('../models/genre')
const Joi = require('Joi')
const router = express.Router()

router.get('/',async (req,res)=>{
    let output = await Genre.find()
    res.send(output)
})

router.post('/', async (req,res)=>{
    const {error} = validateGenre(req.body)
    if (error) return res.status(400).send(error.details)

    let gen = new Genre({
        category: req.body.category
    })
    try{
        const usersave = await gen.save();
        res.send(usersave);
    }
    catch(err){
        res.status(400).send(err);
    }
})

function validateGenre(genre){
    const schema = Joi.object({
        category: Joi.string().required(),
    })
    return schema.validate(genre)

}
module.exports = router;
