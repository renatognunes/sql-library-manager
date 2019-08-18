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
 * Router for all Books homepage
 * @method GET
 * @param {express.resquest}
 * @param {express.response}
 * @param {express.next}
 * @inner
 *  @returns {Promise} await
 *  @returns {JSON} render template
 */
router.get("/books", async (req, res, next) => {
  await Book.findAll({
    attributes: ["id", "title", "author", "genre", "year"]
  }).then(data => {
    const bookData = data.map(book => book.toJSON());
    res.render("all_books", { books: bookData });
  }).catch(next);
});

// Export "/books" router
module.exports = router;
