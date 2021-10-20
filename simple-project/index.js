const movies = require('./routes/movies')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const mongoose = require('mongoose')

const express = require('express')
const app = express()
app.use(express.json())

app.use('/api/customers', customers)
app.use('/api/genres', genres)
app.use('/api/movies', movies)

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>{ console.log("Connection has been successfully established");})
    .catch((err)=>{ console.log("Error While connecting to mongodb", err);})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Listening on port ", port);
})