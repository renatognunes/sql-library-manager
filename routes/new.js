const db = require("../db");
const { Book } = db.models;

// Express Web Framework module
const express = require("express");

// Express router to mounts the router module on a path in the main app.
const router = express.Router();

// Route GET serving /books/new
router.get("/books/new", (req, res) => {
  res.render("new_book");
});

// Route POST serving /books/new
router.post("/books/new", async (req, res) => {
  try {
    const movie = await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: parseInt(req.body.year)
    });
    console.log(movie.toJSON());
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map(err => err.message);
      console.error("Validation errors: ", errors);
    } else {
      throw error;
    }
  }
  res.redirect("/books");
});

// Route "/books/new"
module.exports = router;
