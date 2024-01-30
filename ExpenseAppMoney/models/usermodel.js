const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../util/database');

// Define Sequelize model for User
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ispremiumuser: DataTypes.BOOLEAN
});


module.exports = { User };