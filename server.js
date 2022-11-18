const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const Movie = require("./models/movie.js");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//staic folders
app.use(express.static("public"));

//movie router
const movieRouter = require("./routes/movieRoute.js");
app.use("/", movieRouter);

let PORT = 3000;

if (process.env.PORT) {
  PORT = process.env.PORT;
}

app.listen(PORT, () => {
  console.log("listening");
});

mongoose.connect(
  process.env.MONGOURI,
  {
    //must add in order to not get any error masseges:
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  () => {
    console.log("connected to mongo");
  }
);
