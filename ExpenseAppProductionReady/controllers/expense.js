const { Expense } = require("../models/expenses");
const { User } = require("../models/usermodel");
const sequelize = require("../util/database");

function isStringValid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

const addexpense = async (req, res) => {
  const t = await sequelize.transaction();
  try{
      const { expenseamount, description, category } = req.body;
    // Check some validation
      if (isStringValid(expenseamount) || isStringValid(description) || isStringValid(category)) {
        return res.status(400).json({ message: "Parameter is missing", success: false });
      }

      const expense = await Expense.create(
        { expenseamount, description, category, userId: req.user.id },
        { transaction: t }
      );
      const totalExpense = Number(req.user.totalExpenses) + Number(expenseamount);
      console.log(totalExpense);

      await User.update({
          totalExpenses: totalExpense,
      },{
          where: { id: req.user.id },
          transaction: t,
      })
      await t.commit();
      res.status(201).json({ expense: expense, success: true });
  } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err, success: false });
    };
};

const getexpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    //   const expenses = await Expense.findAll();
    res.status(200).json({ expenses, success: true });
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

const deleteexpense = async (req, res) => {
  const expenseid = req.params.expenseid;
  const t = await sequelize.transaction();

  if (expenseid == undefined || expenseid.length === 0) {
    return res.status(400).json({ success: false });
  }

  try {
    const expense = await Expense.findOne({
      where: { id: expenseid, userId: req.user.id },
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense doesn't belong to the user",
      });
    }
    const deletedAmount = Number(expense.expenseamount)

    const noofrows = await Expense.destroy({
      where: { id: expenseid, userId: req.user.id },
      transaction: t
    });
    if (noofrows === 0) {
      return res.status(404).json({
          success: false,
          message: "Expense doesn't belongs to the user",
        });
    }

    const totalExpense = Number(req.user.totalExpenses) - deletedAmount;
    await User.update({
        totalExpenses: totalExpense,
    },{
        where: { id: req.user.id },
        transaction: t,
    })
    await t.commit();
    res.status(200).json({ message: "Expense deleted successfully", success: true });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err, success: false, message: "Failed" });
  }
};

module.exports = {
  addexpense,
  getexpenses,
  deleteexpense,
};
