const express = require("express");
const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();
const Joi = require("Joi");
const { User } = require("../models/users");

router.get("/me", auth, async (req, res) => {
  let user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already registered");

  user = new User(_.pick(req.body, ["email", "name", "password", "isAdmin"])); // no matter what sequence is

  // password hashing
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  /*
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  */
  const token = user.generateAuthToken();
  let response = await user.save();
  res
    .header("x-auth-token", token)
    .send(_.pick(response, ["_id", "name", "email", "isAdmin"]));
});

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(125).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(user);
}

module.exports = router;
