// Express Web Framework module.
const express = require('express');

// Body Parser module.
const bodyParser = require('body-parser');

// The express function returns an Express application.
const app = express();

// Enable Body Parser to be used.
app.use(bodyParser.urlencoded({ extended: false }))

// Static route middleware.
app.use('/static', express.static('public'));

// Import routes from routes folder.
const homePage = require('./routes');
const books = require('./routes/books');
const createBook = require('./routes/new');
const bookDetail = require('./routes/bookDetail')
const deleteBook = require('./routes/delete')

// Mounts middleware to /index route.
app.use(homePage);
app.use(books);
app.use(createBook);
app.use(bookDetail);
app.use(deleteBook);

// Assigns setting template engine.
app.set('view engine', 'pug');

// Handle 404 error
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
      if(err.status === 404) {
         res.render('page_not_found');
         console.log('Ops! Sorry, There is a problem!', err);
      } else {
         res.render('error');
      }
})

// Setup a development server
app.listen(3000, () => {
   console.log('The application is running on localhost:3000')
});