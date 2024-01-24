const express = require('express');
const router = express.Router();
const UserController = require('../controllers/signupController');

// Define your existing routes
router.post('/signup', UserController.signup);
// Add more routes as needed

// Import the LoginController
const LoginController = require('../controllers/loginController');

// Add a route for user login
router.post('/login', LoginController.login);

module.exports = router;
