const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/users.js");

router.get("/", (req, res) => {
  const noUser = req.session.noUser;
  const wrongPassword = req.session.wrongPassword;
  delete req.session.noUser;
  delete req.session.wrongPassword;
  if (!req.session.isAuth) {
    return res.render("login.ejs", {
      path: req.baseUrl,
      noUser: noUser,
      wrongPassword: wrongPassword,
    });
  }
  res.redirect("/");
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    req.session.noUser =
      "We couldn't find that email, check spelling or create a new account.";
    return res.redirect("/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    req.session.noUser = null;
    req.session.wrongPassword =
      "The password you entered was incorrect, please try again.";
    return res.redirect("/login");
  }
  req.session.isAuth = true;
  req.session.email = email;
  req.session.name = user.name;
  req.session.noUser = null;
  req.session.wrongPassword = null;
  res.redirect("/");
});

module.exports = router;
