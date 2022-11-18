const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const User = require("../models/users.js");

users.get("/", (req, res) => {
  res.render("users/index.ejs");
});

users.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

users.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    res.redirect("/");
  });
});

module.exports = users;
