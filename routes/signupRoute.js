const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/users.js");

router.get("/", (req, res) => {
  if (!req.session.isAuth) {
    return res.render("signup.ejs", {
      path: req.baseUrl,
    });
  }
  res.redirect("/");
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    console.log(user);
    return res.redirect("/signup");
  }

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
