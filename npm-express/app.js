const express = require("express");
const Joi = require("joi");

const eobj = express();
eobj.use(express.json());

let movies = [
  {
    id: 1,
    movieName: "Dark Knight Rises",
  },
];
eobj.post("/api/movies", (req, res) => {
  let schema = Joi.object({
    movieName: Joi.string().min(4).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  }
  let newmovie = {
    id: movies.length + 1,
    movieName: req.body.movieName,
  };
  movies.push(newmovie);
  res.send(newmovie);
});

eobj.put("/api/movies/:id", (req, res) => {
  // look the movie
  var moviefound = movies.find((movie) => {
    return movie.id === parseInt(req.params.id);
  });
  console.log(moviefound);
  // if not 404 error
  if (!moviefound) {
    res.status(404).send("Page not Found!!");
    return;
  }
  // validate
  const { error } = validateMovies(req.body);
  // if invalid pass 400 request
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  //update
  moviefound.movieName = req.body.movieName;
  res.send(moviefound);
});

eobj.delete("/api/movies/:id", (req, res) => {
  // find the movie
  var moviefound = movies.find((movie) => {
    return movie.id === parseInt(req.params.id);
  });
  console.log(moviefound);
  // if not 404 error
  if (!moviefound) {
    res.status(404).send("Page not Found!!");
    return;
  }
  // delete
  let indx = movies.indexOf(moviefound);
  movies.splice(indx, 1);
  res.send(moviefound);
});

eobj.listen(3000, () => {
  console.log("Listening on port 3000..");
});

function validateMovies(movie) {
  const schema = Joi.object({
    movieName: Joi.string().min(4).required(),
  });
  return schema.validate(movie);
}
