const { User } = require('../models/usermodel');
const { Expense } = require('../models/expenses');
const sequelize = require('../util/database');

const getUserLeaderBoard = async (req, res) => {
    try {
        const leaderboardofusers = await User.findAll({
            order: [['totalExpenses', 'DESC']]
        });

        res.status(200).json(leaderboardofusers);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    getUserLeaderBoard
}
