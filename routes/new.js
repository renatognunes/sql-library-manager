/**
 * Import database Book model
 * @const Book 
 */
const db = require("../db");
const { Book } = db.models;

/**
 * Express Web Framework module
 * @requires express
 */
const express = require("express");

/**
 * Express Router
 * @method Router
 */
const router = express.Router();

/**
 * Router for creating new books
 * @method GET
 * @param {express.resquest}
 * @param {express.response}
 * @inner
 *  @returns render template
 */
router.get("/books/new", (req, res) => {
  res.render("new_book");
});

/**
 * Router for creating a new book
 * @method POST
 * @param {express.resquest}
 * @param {express.response}
 * @inner
 *  @param {string} input.value
 *  @returns {Promise} If resolve it will create a new model and redirect to homepage. If it throws, find validation errors and print messages.
 */
router.post("/books/new", async (req, res) => {
  try {
    await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: parseInt(req.body.year)
    });
    res.redirect('/books');
  } catch (error) {
    if (error.name === "SequelizeValidationError") {

      const errorItem = error.errors.map(err => err.path);
      const errorMsg = error.errors.map(err => err.message);

      let isTitleEmpty = false;
      let isAuthorEmpty = false;

      if(errorItem.includes("title")) {
        isTitleEmpty = true;
      } else {
        isTitleEmpty = false;
      }

      if(errorItem.includes("author")) {
        isAuthorEmpty = true;
      } else {
        isAuthorEmpty = false;
      }

      res.render('new_book', { isTitleEmpty, isAuthorEmpty });
      console.error("Validation errors: ", errorMsg);
    }
  }
});

// Export "/books/new" Router
module.exports = router;
