const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Year: { type: String, required: true },
    Rated: { type: String, required: true },
    Released: { type: String, required: true },
    Runtime: { type: String, required: true },
    Genre: { type: String, required: true },
    Director: { type: String, required: true },
    Actors: { type: String, required: true },
    Plot: { type: String, required: true },
    Poster: { type: String, required: true },
    imdbRating: { type: String, required: true },
    BoxOffice: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
