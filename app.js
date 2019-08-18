/**
 * Express Web Framework module
 * @requires express
 */
const express = require('express');

/**
 * Requires bodyParser module
 * @requires bodyParser
 */
const bodyParser = require('body-parser');

/** 
 * @function express
 * The express function returns an Express application 
 */
const app = express();

/**
 * Enable bodyParser URL encoded
 * @memberof Express
 * @method use
 * @param {Object} bodyParser
 */
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * Static route middleware.
 * @function use
 * @param {string} path - /static/
 * @param {callback} middleware - Express middleware.
 */
app.use('/static', express.static('public'));


// Import routes from routes folder.

/**
 * Index module
 * @module routes/index
 */
const homePage = require('./routes');

/**
 * Books Router
 * @module routes/books
 */
const books = require('./routes/books');

/**
 * New Book Router
 * @module routes/new
 */
const createBook = require('./routes/new');

/**
 * Book Detail's
 * @module routes/booksDetail
 */
const bookDetail = require('./routes/bookDetail')

/**
 * Delete Book
 * @module routes/delete
 */
const deleteBook = require('./routes/delete')

// Mounts middleware to /index route.

/** 
 * Mounts middleware to "/" route
 * @memberof express
 * @function use
 * @param {Object} homePage
 */
app.use(homePage);

/** 
 * Mounts middleware to "/books" route
 * @memberof express
 * @function use
 * @param {Object} books
 */
app.use(books);

/** 
 * Mounts middleware to "books/new" route
 * @memberof express
 * @function use
 * @param {Object} createBook
 */
app.use(createBook);

/** 
 * Mounts middleware to "books/details:id" route
 * @memberof express
 * @function use
 * @param {Object} bookDetail
 */
app.use(bookDetail);

/** 
 * Mounts middleware to "books/:id/delete" route
 * @memberof express
 * @function use
 * @param {Object} deleteBook
 */
app.use(deleteBook);

// Assigns setting template engine.
app.set('view engine', 'pug');

/**
 * Handle 404 error
 * @memberof Express
 * @function use
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 * @return {Object} - Error Object
 */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Error Handling Middleware
 * @memberof Express
 * @function use
 * @param {Object} err - Error Object
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 * @inner
   * @returns render template accordingly error
 */
app.use((err, req, res, next) => {
      if(err.status === 404) {
         res.render('page_not_found');
         console.log('Ops! Sorry, There is a problem!', err);
      } else {
         res.render('error');
         console.log('Ops! Sorry, There is a problem in the server! Probably you tried to access a book ID that does not exist!');
      }
})

/**
 * Setup a development server
 * @memberof Express
 * @method listen
 * @param {number} port
 */
app.listen(3000, () => {
   console.log('The application is running on localhost:3000')
});