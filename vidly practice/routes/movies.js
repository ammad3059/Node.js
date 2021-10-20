const express = require('express')       // returns a function
const router = express.Router()
const Joi = require("Joi")
const mongoose = require('mongoose')

let movies = [
    { id: 1, name: "Dark Knight", category: "action" },
    { id: 2, name: "padmavati", category: "history" },
    { id: 3, name: "KGF Chapter 2", category: "action thriller" }
]

router.get("/", (req, res) => {
    res.send(movies);
})

router.post('/', (req, res) => {
    const { error } = validateMovies(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let newMovie = {
        id: movies.length + 1,
        name: req.body.movieName,
        category: req.body.category
    }

    movies.push(newMovie)
    let movie_name = movies[movies.length - 1].name;
    let cat_name = movies[movies.length - 1].category;
    createMovie(movie_name, cat_name);
    res.send(movies)
})


function validateMovies(movie) {
    const schema = Joi.object({
        movieName: Joi.string().min(4).required(),
        category: Joi.string().min(4).required()
    })
    return schema.validate(movie)
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => { console.log("Connection Established!!"); })
    .catch((error) => { console.log("Error while Connecting to MongoDb: ", error); })

const Movie = mongoose.model('Movie', new mongoose.Schema({
    name: { type: String, required: true, minlength: 4, lowercase: true },
    category: { type: String, required: true, minlength: 4, lowercase: true }
}))

async function createMovie(movie_name, cat_name) {
    let m = new Movie({
        name: movie_name,
        category: cat_name
    })
    let res = await m.save()
    console.log(res);
}

module.exports = router;