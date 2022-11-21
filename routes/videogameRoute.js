const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");
const Videogame = require("../models/videogame.js");
let newVideogame = null;
let newVideogameList = null;

const axiosInstance = axios.create({
  baseURL:
    "https://api.rawg.io/api/games?&page_size=1&key=c0c6014b258d466fb57399b9a650c224&search=",
  header: { "Access-Control-Allow_Origin": "*" },
});

//checking to see if user is logged in
const isAuth = (req, res, next) => {
  if (!req.session.isAuth) {
    res.redirect("/");
  }
  next();
};

//home
router.get("/", (req, res) => {
  res.render("videogamehome.ejs", {
    data: "",
    name: req.session.name,
    auth: req.session.isAuth,
    email: req.session.email,
    path: req.baseUrl,
  });
});

//delete
router.get("/videogame/delete/:id", (req, res) => {
  Videogame.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/videogame/videogamelist");
  });
});

//show
router.get("/show", async (req, res, next) => {
  const videogame = req.query.videogame;
  const response = await axiosInstance.get(videogame);
  newVideogame = response.data.results[0];
  newVideogameList = response.data;
  if (newVideogameList.count === 0) {
    return res.redirect("/videogame");
  }
  res.render("videogameshow.ejs", {
    data: newVideogame,
    name: req.session.name,
    auth: req.session.isAuth,
    email: req.session.email,
    path: req.baseUrl,
  });
});

//movielist
router.get("/addvideogame", (req, res) => {
  newVideogameList.email = req.session.email;
  Videogame.create(newVideogameList, (err, data) => {
    res.redirect("/videogame/videogamelist");
  });
});

router.get("/videogamelist", isAuth, (req, res) => {
  Videogame.find({ email: req.session.email }, (err, foundData) => {
    res.render("videogamelist.ejs", {
      data: foundData,
      name: req.session.name,
      auth: req.session.isAuth,
      email: req.session.email,
      path: req.baseUrl,
    });
  });
});

module.exports = router;
