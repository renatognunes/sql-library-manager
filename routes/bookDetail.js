const db = require("../db");
const { Book } = db.models;

// Express Web Framework module
const express = require("express");

// Express router to mounts the router module on a path in the main app.
const router = express.Router();

// Route serving /index
router.get("/books/:id", async (req, res) => {
  await Book.findByPk(req.params.id)
    .then( detail => {
      console.log(data.toJSON())
      res.render("book_detail", {book: detail})
  });
});

// Route "/books"
module.exports = router;
