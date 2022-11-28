const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Year: { type: String },
    Rated: { type: String },
    Released: { type: String },
    Runtime: { type: String },
    Genre: { type: String },
    Director: { type: String },
    Actors: { type: String },
    Plot: { type: String },
    Poster: { type: String },
    imdbRating: { type: String },
    BoxOffice: { type: String },
    email: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
