const mongoose = require("mongoose");

const videogameSchema = new mongoose.Schema(
  {
    results: [
      {
        name: String,
        released: String,
        background_image: String,
        metacritic: Number,
        genres: [
          {
            name: String,
          },
        ],
      },
    ],
    email: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Videogame", videogameSchema);
