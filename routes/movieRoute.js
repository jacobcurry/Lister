const express = require("express");
const router = express.Router();
const axios = require("axios");
let newMovie = "";

const axiosInstance = axios.create({
  baseURL: "https://www.omdbapi.com/?apikey=785aa019&t=",
  header: { "Access-Control-Allow_Origin": "*" },
});

router.get("/", (req, res) => {
  res.render("moviehome.ejs", {
    data: "",
  });
});
router.get("/movie", async (req, res, next) => {
  const movie = req.query.movie;
  const response = await axiosInstance.get(movie);
  newMovie = response.data;
  res.render("moviehome.ejs", {
    data: newMovie,
  });
});

router.get("/movie/show", (req, res) => {
  res.render("movieshow.ejs", {
    data: newMovie,
  });
});

module.exports = router;
