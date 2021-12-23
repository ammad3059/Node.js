const movies = require("./routes/movies");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const users = require("./routes/users");
const auth = require("./routes/auth");
const rentals = require("./routes/rentals");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
const config = require("config");
app.use(express.json());

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: Private key is not assigned.");
  process.exit(1);
}

app.use("/api/customers", customers);
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log("Connection has been successfully established");
  })
  .catch((err) => {
    console.log("Error While connecting to mongodb", err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port ", port);
});
