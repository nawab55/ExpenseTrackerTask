const { User }= require('../models/usermodel');
const { Expense } = require('../models/expenses');
const sequelize = require('../util/database');

const getUserLeaderBoard = async (req, res) => {
    try{
        const users =  await User.findAll();
        const expenses = await Expense.findAll();
        const userAggregatedExpenses = {};
        console.log(expenses);
        expenses.forEach((expense) => {

            const expenseAmount = parseInt(expense.expenseamount);
            if(userAggregatedExpenses[expense.userId]){
                userAggregatedExpenses[expense.userId] = userAggregatedExpenses[expense.userId] + expenseAmount;
            } else{
                userAggregatedExpenses[expense.userId] = expenseAmount;
            }
        });
        // console.log(userAggregatedExpenses);

        var userLeaderBoardDetails = [];
        users.forEach((user) => {
            userLeaderBoardDetails.push({ username: user.username, total_cost: userAggregatedExpenses[user.id] || 0 })
        })
        console.log(userLeaderBoardDetails);
        userLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost);
        
        res.status(200).json(userLeaderBoardDetails);

    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    getUserLeaderBoard
}


