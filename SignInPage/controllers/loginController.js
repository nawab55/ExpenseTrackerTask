const { User } = require('../models/signupmodel');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            // User not found
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify password
        if(password === user.password){
            return res.status(200).json({ message: 'User login successful' });
        } else {
            // Incorrect password
            return res.status(401).json({ error: 'User not authorized' });
        }
       
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
