const Sequelize = require('sequelize');

/**
 * Module Book initialize the Book table model
 * @namespace Book
 * @extends Sequelize.Model
 */
module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "title"'
        },
        notNull: {
          msg: 'Please provide a value for "title"'
        }
      }
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "author"'
        },
        notNull: {
          msg: 'Please provide a value for "author"'
        }
      }
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: true
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
  },
  {
   sequelize 
  });
  return Book;
};