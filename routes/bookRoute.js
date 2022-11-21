const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");
const Book = require("../models/book.js");
let newBook = null;
let newBookList = null;

const axiosInstance = axios.create({
  baseURL:
    "https://www.googleapis.com/books/v1/volumes?orderBy=relevance&maxResults=1&key=AIzaSyDLbUjMG6wOtD5jp2mO7c2nwfovoAhk58M&q=",
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
  res.render("bookhome.ejs", {
    data: "",
    name: req.session.name,
    auth: req.session.isAuth,
    email: req.session.email,
    path: req.baseUrl,
  });
});

//delete
router.get("/book/delete/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/book/booklist");
  });
});

//show
router.get("/show", async (req, res, next) => {
  const book = req.query.book;
  const response = await axiosInstance.get(book);
  newBook = response.data;
  newBookList = response.data.items[0].volumeInfo;
  if (newBook.totalItems === 0) {
    return res.redirect("/");
  }
  res.render("bookshow.ejs", {
    data: newBookList,
    name: req.session.name,
    auth: req.session.isAuth,
    email: req.session.email,
    path: req.baseUrl,
  });
});

//movielist
router.get("/addbook", (req, res) => {
  newBook.email = req.session.email;
  Book.create(newBook, (err, data) => {
    res.redirect("/book/booklist");
  });
});

router.get("/booklist", isAuth, (req, res) => {
  Book.find({ email: req.session.email }, (err, foundData) => {
    res.render("booklist.ejs", {
      data: foundData,
      name: req.session.name,
      auth: req.session.isAuth,
      email: req.session.email,
      path: req.baseUrl,
    });
  });
});

module.exports = router;
