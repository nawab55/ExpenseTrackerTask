const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../util/database');

// Define Sequelize model for User
const Expense = sequelize.define('expense', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    expenseamount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


module.exports = { Expense };