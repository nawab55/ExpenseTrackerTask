const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const bcrypt = require('bcrypt');

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
});

// Example of a Login model that encapsulates login-specific logic
class LoginModel {
    static async findByEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new Error('Internal Server Error');
        }
    }

    static async verifyPassword(plainPassword, hashedPassword) {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            console.error('Error verifying password:', error);
            throw new Error('Internal Server Error');
        }
    }
}

// Export both the Sequelize User model and the LoginModel
module.exports = {
    User,
    LoginModel
};
