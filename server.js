const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

//movie router
const movieRouter = require("./routes/movieRoute.js");
app.use("/movie", movieRouter);

//staic folders
app.use(express.static("public"));

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
