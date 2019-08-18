const Sequelize = require('sequelize');

/**
 * Create new Sequelize instance
 * @const sequelize
 */
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db', 
  define: {
    timestamps: true,
  },
  logging: false,
});

/**
 * Include Book module to the database
 * @const db
 */
const db = {
  sequelize,
  Sequelize,
  models: {},
};

db.models.Book = require('./models/book.js')(sequelize);

// Exports db module
module.exports = db;