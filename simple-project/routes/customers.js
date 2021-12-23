const express = require("express");
const Joi = require("Joi");
const { Customer } = require("../models/customer");

const router = express.Router();

router.get("/", async (req, res) => {
  let result = await Customer.find();
  res.send(result);
});

router.post("/", async (req, res) => {
  console.log("In post now");
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details);

  let user = new Customer({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  });
  try {
    const usersave = await user.save();
    res.send(usersave);
  } catch (err) {
    res.status(400).send(err);
  }
});

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(125).required(),
    email: Joi.string().max(225).required(),
    age: Joi.number().min(18),
  });
  return schema.validate(customer);
}
module.exports = router;
