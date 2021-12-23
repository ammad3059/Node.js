const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: [
      "action",
      "thriller",
      "comedy",
      "romance",
      "history",
      "science fiction",
      "adventure",
    ],
    required: true,
    default: "comedy",
  },
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
