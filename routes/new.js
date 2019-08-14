// Express Web Framework module
const express = require('express');

// Express router to mounts the router module on a path in the main app.
const router = express.Router();

// Route GET serving /books/new
router.get('/books/new', (req, res) => {
  res.render('new_book');
});

// Route POST serving /books/new
router.post('/books/new', (req, res) => {
  console.log(req.body)
  res.redirect('/books');
});

// Route "/books/new"
module.exports = router;