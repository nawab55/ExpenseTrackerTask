const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense-tracker', 'root', 'Nawab@#$123', {
  host: 'localhost',
  dialect: 'mysql',
});


// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;