const User = require('../models/signupmodel');

exports.addUser = async (req, res) => {
    try{
        const { username, email, password } = req.body;
        
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }
                // Create a new user
        const newUser = await User.create({ username, email, password });

        // Redirect or send a success response
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}
