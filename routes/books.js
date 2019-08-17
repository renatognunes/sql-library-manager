const db = require("../db");
const { Book } = db.models;
const { Op } = db.Sequelize;

// Express Web Framework module
const express = require("express");

// Express router to mounts the router module on a path in the main app.
const router = express.Router();

// Route serving /index
router.get("/books", async (req, res, next) => {
  await Book.findAll({
    attributes: ["id", "title", "author", "genre", "year"]
  }).then(data => {
    const bookData = data.map(book => book.toJSON());
    res.render("all_books", { books: bookData });
  }).catch(next);
});

// Route "/books"
module.exports = router;
