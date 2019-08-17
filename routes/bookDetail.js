const db = require("../db");
const { Book } = db.models;

// Express Web Framework module
const express = require("express");

// Express router to mounts the router module on a path in the main app.
const router = express.Router();

// Route serving /index
router.get("/books/:id", async (req, res, next) => {
    await Book.findByPk(req.params.id)
      .then( book => res.render("book_detail", { book }))
      .catch(next)
});

// Route serving /index
router.post("/books/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  try {
    await book.update({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: parseInt(req.body.year)
    });
    res.redirect('/books');
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      res.render('book_detail', { book , formError: true });
      const errors = error.errors.map(err => err.message);
      console.error("Validation errors: ", errors);
    }
  }
});

// Route "/books"
module.exports = router;
