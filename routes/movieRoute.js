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
  const movieError = req.session.movieError;
  const movie = req.session.movie;
  delete req.session.movieError;
  delete req.session.movie;
  res.render("moviehome.ejs", {
    data: "",
    name: req.session.name,
    auth: req.session.isAuth,
    email: req.session.email,
    path: req.baseUrl,
    movieErr: movieError,
    movie: movie,
  });
});

//delete
router.get("/movie/delete/:id", (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/movie/movielist");
  });
});

//show
router.get("/show", async (req, res, next) => {
  const movie = req.query.movie;
  const response = await axiosInstance.get(movie);
  newMovie = response.data;
  if (newMovie.Error) {
    req.session.movie = movie;
    req.session.movieError = true;
    return res.redirect("/movie");
  }
  res.render("movieshow.ejs", {
    data: newMovie,
    name: req.session.name,
    auth: req.session.isAuth,
    email: req.session.email,
    path: req.baseUrl,
  });
});

//movielist
router.get("/addmovie", (req, res) => {
  newMovie.email = req.session.email;
  Movie.find({ email: req.session.email }, (err, foundData) => {
    let duplicate = false;
    for (let i = 0; i < foundData.length; i++) {
      if (foundData[i].Title === newMovie.Title) {
        duplicate = true;
      }
    }
    if (duplicate) {
      return res.redirect("/movie/movielist");
    } else {
      Movie.create(newMovie, (err, data) => {});
      return res.redirect("/movie/movielist");
    }
  });
});

router.get("/movielist", isAuth, (req, res) => {
  Movie.find({ email: req.session.email }, (err, foundData) => {
    res.render("movielist.ejs", {
      data: foundData,
      name: req.session.name,
      auth: req.session.isAuth,
      email: req.session.email,
      path: req.baseUrl,
    });
  });
});

module.exports = router;
