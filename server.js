const express = require("express");
const mongoose = require("mongoose");
const app = express();

let PORT = 3000;

if (process.env.PORT) {
  PORT = process.env.PORT;
}

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(PORT, () => {
  console.log("listening");
});

mongoose.connect(
  "mongodb+srv://jacobc:jacobcpassword@movielist.2bmc6y2.mongodb.net/?retryWrites=true&w=majority",
  () => {
    console.log("connected to mongo");
  }
);
