const express = require("express");
const router = express.Router();
const User = require("../models/users");

let users = [
  { name: "ammad majid", email: "ammad@gmail.com", city: "karachi" },
  { name: "mohammad anas", email: "anas@gmail.com", city: "Los Angeles" },
  { name: "arqam shakeel", email: "arqam123@gmail.com", city: "Lahore" },
];

router.get("/", (req, res) => {
  res.send(users);
  createUser();
});

async function createUser() {
  let newUser = new User({
    name: "Ammad",
    email: "ammad123@strugbits.com",
    city: "karachi",
  });

  let result = await newUser.save();
  console.log(result);
}

module.exports = router;
