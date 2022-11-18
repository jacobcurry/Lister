const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/users.js");

sessions.get("/login", (req, res) => {
  res.render("sessions/login.ejs");
});

sessions.get("/", (req, res) => {
  res.render("sessions/new.ejs", { currentUser: req.sessions.currentUser });
});

sessions.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send("db had a problem");
    } else if (!foundUser) {
      res.send('<a href="/movie">Sorry. no user found </a>');
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect("/");
      } else {
        res.send('<a href="/">Password does not match</a>');
      }
    }
  });
});

sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = sessions;
