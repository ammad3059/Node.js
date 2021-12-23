const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/demo", { useNewUrlParser: true });
mongoose.connection
  .once("open", function () {
    console.log("Connection created successfully!!");
  })
  .on("error", function (err) {
    console.log("Error occured while connecting", err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
