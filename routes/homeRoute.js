const express = require("express");
const router = express.Router();

//home
router.get("/", (req, res) => {
  res.render("home.ejs", {
    data: "",
    name: req.session.name,
    auth: req.session.isAuth,
    email: req.session.email,
    path: req.baseUrl,
  });
});

module.exports = router;
