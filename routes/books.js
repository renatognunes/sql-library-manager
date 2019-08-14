const db = require('../db');
const { Book } = db.models;

// Express Web Framework module
const express = require('express');

// Express router to mounts the router module on a path in the main app.
const router = express.Router();

// Route serving /index
router.get('/books', async (req, res) => {
    await db.sequelize.sync();
    await Book.findAll({
      attributes: ['title', 'author']
    })
    .then( data => {
      console.log( data.map(movie => movie.toJSON()) );
    res.render('all_books');
    })
});

// Route "/books"
module.exports = router;