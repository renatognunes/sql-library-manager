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
 * Router for deleting books
 * @method POST
 * @param {express.resquest}
 * @param {express.response}
 * @inner
 *  @const book {Promise} find book by Primary Key
 *  @method destroy 
 *  @returns redirect URI
 */
router.post("/books/:id/delete", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books');
});

// Export "/books/:id/delete" router
module.exports = router;