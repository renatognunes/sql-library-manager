const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
    // Set custom primary key column
    // id: {
    //   type: Sequelize.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
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
  // Model options object
  {
   sequelize 
  });
  return Book;
};