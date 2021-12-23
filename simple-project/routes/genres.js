const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre } = require("../models/genre");
const Joi = require("Joi");
const router = express.Router();

router.get("/", async (req, res) => {
  let output = await Genre.find();
  res.send(output);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details);

  let genre = new Genre({
    category: req.body.category,
  });
  try {
    const usersave = await genre.save();
    res.send(usersave);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The Genre with the given id is not found");

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    category: Joi.string().required(),
  });
  return schema.validate(genre);
}
module.exports = router;
