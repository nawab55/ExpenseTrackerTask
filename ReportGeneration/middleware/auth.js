const jwt = require('jsonwebtoken');
const { User } = require('../models/usermodel');

const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
        }

        const user = jwt.verify(token, 'secretkey');
        console.log("userId >>>>", user.userId);

        User.findByPk(user.userId).then(user => {
            if (!user) {
                throw new Error('User not found');
            }

            req.user = user;
            next();
        }).catch(err => {
            throw new Error(err);
        });
    } catch (err) {
        console.error(err);
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
};

module.exports = {
    authenticate
};
