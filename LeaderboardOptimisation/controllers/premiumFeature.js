const { User } = require('../models/usermodel');
const { Expense } = require('../models/expenses');
const sequelize = require('../util/database');

const getUserLeaderBoard = async (req, res) => {
    try {
        const leaderboardofusers = await User.findAll({
            attributes: [
                'id',
                'username',
                [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('expenses.expenseamount')), 0), 'total_cost']
            ],
            include: [
                {
                    model: Expense,
                    attributes: []
                }
            ],
            group: ['user.id'],
            order: [['total_cost', 'DESC']]
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
