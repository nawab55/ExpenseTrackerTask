const { User }= require('../models/signupmodel');


function isStringValid(string) {
    return string === undefined || string.length === 0;
}

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check some validation
        if (isStringValid(username) || isStringValid(email) || isStringValid(password)) {
            return res.status(400).json({ error: "Bad parameters, something is missing" });
        }

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.', User: existingUser });
        }

        // Create a new user
        const newUser = await User.create({ username, email, password });

        // Redirect or send a success response
        res.status(201).json({ message: "Successful create a new user.", User: newUser });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
