const db = require("../db");
const { Book } = db.models;

// Express Web Framework module
const express = require("express");

// Express router to mounts the router module on a path in the main app.
const router = express.Router();

// Route serving /index
router.post("/books/:id/delete", async (req, res) => {
  const book = await Book.findByPk(req.params.id).destroy();
  await book.destroy();
  res.redirect('/books');
});

// Route "/books"
module.exports = router;