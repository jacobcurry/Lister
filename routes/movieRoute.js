const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");
const Movie = require("../models/movie.js");
const movie = require("../models/movie.js");
let newMovie = "";

const axiosInstance = axios.create({
  baseURL: "https://www.omdbapi.com/?apikey=785aa019&t=",
  header: { "Access-Control-Allow_Origin": "*" },
});

//home
router.get("/", (req, res) => {
  res.render("moviehome.ejs", {
    data: "",
  });
});

//show
router.get("/show", async (req, res, next) => {
  const movie = req.query.movie;
  const response = await axiosInstance.get(movie);
  newMovie = response.data;
  //console.log(newMovie);
  if (newMovie.Error) {
    res.render("moviehome.ejs", { error: newMovie.Error });
  } else {
    res.render("movieshow.ejs", {
      data: newMovie,
    });
  }
});

//movielist
router.get("/addmovie", (req, res) => {
  Movie.create(newMovie, (err, data) => {
    console.log(newMovie);
  });
  res.redirect("/movielist");
});

router.get("/movielist", (req, res) => {
  Movie.find({}, (err, foundData) => {
    res.render("movielist.ejs", { data: foundData });
  });
});
// axios
//   .post("/movielist")
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = router;
