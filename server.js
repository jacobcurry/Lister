const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//checking to see if user is logged in
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
  }
};

//user controller
const userController = require("./controllers/users_controller.js");
app.use("/users", userController);

//session controller
const sessionsConstoller = require("./controllers/sessions_controller.js");
app.use("/sessions", sessionsConstoller);

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
