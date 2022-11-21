const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
require("dotenv").config();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

const store = new MongoDBSession({
  uri: process.env.MONGOURI,
  collection: "mySessions",
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//staic folders
app.use(express.static("public"));

//movie router
const homeRouter = require("./routes/homeRoute.js");
app.use("/", homeRouter);
//movie router
const movieRouter = require("./routes/movieRoute.js");
app.use("/movie", movieRouter);
//movie router
const videogameRouter = require("./routes/videogameRoute.js");
app.use("/videogame", videogameRouter);
//movie router
const bookRouter = require("./routes/bookRoute.js");
app.use("/book", bookRouter);
//login router
const loginRouter = require("./routes/loginRoute.js");
app.use("/login", loginRouter);
//signup router
const signupRouter = require("./routes/signupRoute.js");
app.use("/signup", signupRouter);
//logout router
const logoutRouter = require("./routes/logoutRoute.js");
app.use("/logout", logoutRouter);

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
  },
  () => {
    console.log("connected to mongo");
  }
);
