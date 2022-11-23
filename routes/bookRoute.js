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
  const bookError = req.session.bookError;
  const book = req.session.book;
  delete req.session.bookError;
  delete req.session.book;
  res.render("bookhome.ejs", {
    data: "",
    name: req.session.name,
    auth: req.session.isAuth,
    email: req.session.email,
    path: req.baseUrl,
    bookErr: bookError,
    book: book,
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
  if (newBook.totalItems === 0) {
    req.session.bookError = true;
    req.session.book = book;
    return res.redirect("/book");
  }
  newBookList = response.data.items[0].volumeInfo;
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
  Book.find({ email: req.session.email }, (err, foundData) => {
    let duplicate = false;
    for (let i = 0; i < foundData.length; i++) {
      if (
        foundData[i].items[0].volumeInfo.title ===
        newBook.items[0].volumeInfo.title
      ) {
        duplicate = true;
      }
    }
    if (duplicate) {
      return res.redirect("/book/booklist");
    } else {
      Book.create(newBook, (err, data) => {});
      return res.redirect("/book/booklist");
    }
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
