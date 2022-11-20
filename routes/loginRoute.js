const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/users.js");

router.get("/", (req, res) => {
  if (!req.session.isAuth) {
    return res.render("login.ejs");
  }
  res.redirect("/");
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.redirect("/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.redirect("/login");
  }
  req.session.isAuth = true;
  req.session.email = email;
  req.session.name = user.name;
  res.redirect("/");
});

module.exports = router;
