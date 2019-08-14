const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db', 
  define: {
    timestamps: true,
  },
  logging: false,
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};

db.models.Book = require('./models/book.js')(sequelize);

module.exports = db;