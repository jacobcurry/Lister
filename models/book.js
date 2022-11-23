const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    items: [
      {
        volumeInfo: {
          title: { type: String, required: true },
          authors: [{ type: String, required: true }],
          description: { type: String, required: true },
          pageCount: { type: Number, required: true },
          categories: [{ type: String, required: true }],
          imageLinks: {
            thumbnail: { type: String },
          },
        },
      },
    ],
    email: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
