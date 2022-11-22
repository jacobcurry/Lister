const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/users.js");

router.get("/", (req, res) => {
  const userExists = req.session.userExists;
  delete req.session.userExists;
  if (!req.session.isAuth) {
    return res.render("signup.ejs", {
      path: req.baseUrl,
      userExists: userExists,
    });
  }
  res.redirect("/");
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    req.session.userExists = "A user with that email address already exists";
    return res.redirect("/signup");
  }

  req.session.userExists = null;

  const hashedPassword = await bcrypt.hash(password, 10);

  user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  res.redirect("/login");
});

module.exports = router;
