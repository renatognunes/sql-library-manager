// Express Web Framework module
const express = require('express');

// Express router to mounts the router module on a path in the main app.
const router = express.Router();

// Route serving /index
router.get('/', (req, res) => {
  res.redirect('/books');
});

// Route "/"
module.exports = router;