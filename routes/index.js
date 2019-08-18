/**
 * Express Web Framework module
 * @requires express
 */
const express = require('express');

/**
 * Express Router
 * @method Router
 */
const router = express.Router();

/**
 * Router for redirecting homepage to "/books"
 * @method GET
 * @param {express.resquest}
 * @param {express.response}
 * @inner
 *  @returns redirect URI
 */
router.get('/', (req, res) => {
  res.redirect('/books');
});

// Export "/" Router
module.exports = router;