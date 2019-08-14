// Express Web Framework module.
const express = require('express');

const bodyParser = require('body-parser');

// The express function returns an Express application.
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

//Static route middleware.
app.use('/static', express.static('public'));

// Import routes from routes folder.
const homePage = require('./routes');
const books = require('./routes/books');
const createBook = require('./routes/new');
const bookDetail = require('./routes/bookDetail')

// Mounts middleware to /index route.
app.use(homePage);
app.use(books);
app.use(createBook);
app.use(bookDetail);

// Assigns setting template engine.
app.set('view engine', 'pug');

// Handle 404 error
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  console.log('Ops! Sorry, There is a problem!', err);
  next(err);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
   res.locals.error = err;
   res.status(err.status);
   res.render('error');
})

// Setup a development server
app.listen(3000, () => {
   console.log('The application is running on localhost:3000')
});