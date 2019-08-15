const db = require("../db");
const { Book } = db.models;

// Express Web Framework module
const express = require("express");

// Express router to mounts the router module on a path in the main app.
const router = express.Router();

// Route serving /index
router.get("/books/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("book_detail", { book: book });
});

// Route serving /index
router.post("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    await book.update({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: parseInt(req.body.year)
    });
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

// Route "/books"
module.exports = router;
