const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");
const Movie = require("../models/movie.js");
let newMovie = "";

const axiosInstance = axios.create({
  baseURL: "https://www.omdbapi.com/?apikey=785aa019&t=",
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
  res.render("moviehome.ejs", {
    data: "",
    name: req.session.name,
    auth: req.session.isAuth,
    email: req.session.email,
  });
});

//delete
router.get("/delete/:id", (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/movielist");
  });
});

//show
router.get("/show", async (req, res, next) => {
  const movie = req.query.movie;
  const response = await axiosInstance.get(movie);
  newMovie = response.data;
  res.render("movieshow.ejs", {
    data: newMovie,
    name: req.session.name,
    auth: req.session.isAuth,
    email: req.session.email,
  });
});

//movielist
router.get("/addmovie", (req, res) => {
  newMovie.email = req.session.email;
  Movie.create(newMovie, (err, data) => {});
  res.redirect("/movielist");
});

router.get("/movielist", isAuth, (req, res) => {
  Movie.find({ email: req.session.email }, (err, foundData) => {
    res.render("movielist.ejs", {
      data: foundData,
      name: req.session.name,
      auth: req.session.isAuth,
      email: req.session.email,
    });
  });
});

module.exports = router;
