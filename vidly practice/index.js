const movies = require('./routes/movies')
const express = require('express')       // returns a function
const vidly = express()

vidly.use(express.json())     // able to get data in json format
vidly.use('/api/movies', movies)


const port = process.env.PORT || 3000;
vidly.listen(port, () => { console.log(`Listening on port ${port}`);})