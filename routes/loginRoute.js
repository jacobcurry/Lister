const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/users.js");

router.get("/", (req, res) => {
  res.render("login.ejs");
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
  res.redirect("/");
});

module.exports = router;
