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
 * Router for Book details using ID params and renders view
 * @method GET
 * @param {express.resquest}
 * @param {express.response}
 * @param {express.next}
 * @inner
 *  @param {string} id
 *  @returns {Promise} await
 *  @returns render template
 */
router.get("/books/:id", async (req, res, next) => {
    await Book.findByPk(req.params.id)
      .then( book => res.render("book_detail", { book }))
      .catch(next)
});


/**
 * Router for Book details using ID params and Update table
 * @method POST
 * @param {express.resquest}
 * @param {express.response}
 * @inner
 *  @param {string} id
 *  @returns {Promise} If resolve it will update the model and redirect to homepage. If it throws, find validation errors and print messages.
 */
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

      res.render('book_detail', { book , isTitleEmpty, isAuthorEmpty });
      console.error("Validation errors: ", errorMsg);
    }
  }
});

// Export "/books:id" router
module.exports = router;
