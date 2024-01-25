const { User } = require('../models/usermodel');
const bcrypt = require('bcrypt');

function isStringValid(string){
    if(string == undefined || string.length === 0){
        return true;
    } else{
        return false;
    }
}

const signup = async (req, res) => {
    try{
        const { username, email, password } = req.body;
        
        // Check some validation
        if(isStringValid(username) || isStringValid(email) || isStringValid(password)){
            return res.status(400).json({ error: "Bad parameters, something is missing" });
        }
        
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.', User: existingUser });
            
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            console.log(err);
            // Create a new user
            const newUser = await User.create({ username, email, password: hash});
            // Redirect or send a success response
            res.status(201).json({ message: "Successful create a new user."});
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(isStringValid(email) || isStringValid(password)){
            return res.status(400).json({ message: "Email or Password is missing", success: false });
        }

        // Find user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            // User not found
            return res.status(404).json({success: false, message: 'User not found' });
        }

         // Verify password
         const isPasswordValid = await bcrypt.compare(password, user.password);

         if (isPasswordValid) {
             // Password is valid, login successful
             return res.status(200).json({success: true, message: 'User login successful' });
         } else {
             // Incorrect password
             console.error('Password mismatch for user:', user.email);
             return res.status(401).json({success: false, message: 'User not authorized' });
         }
       
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ err: 'Internal Server Error', success: false, message: err });
    }
};


// const login = (req, res) => {
//     const { email, password } = req.body;
//     console.log(password);

//     if(isStringValid(email) || isStringValid(password)){
//         return res.status(400).json({ message: "Email or Password is missing", success: false });
//     }

//     User.findAll({ where: { email } }).then(user => {
//         if(user.length > 0){
//             if(user[0].password === password){
//                 return res.status(200).json({ success: true, message: "User logged in successfully" });
//             } else{
//                 return res.status(400).json({success: false, message: "Password is incorrect"});
//             }
//         } else{
//             return res.status(404).json({success: false, message: "User Doesnot exists"});
//         }
//     }).catch(err => {
//         // console.log(err);
//         res.status(500).json({ message: err, success: false });
//     })
    
// }

module.exports = {
    signup,
    login
};