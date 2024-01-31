const { Expense } = require('../models/expenses');

function isStringValid(string){
    if(string == undefined || string.length === 0){
        return true;
    } else{
        return false;
    }
}

const addexpense = async (req, res) => {
    try{
        const { expenseamount, description, category } = req.body;

        // Check some validation
        if(isStringValid(expenseamount) || isStringValid(description) || isStringValid(category)){
            return res.status(400).json({  message: "Parameter is missing", success: false  });
        }
    
        const newExpense = await Expense.create({ expenseamount, description, category, userId: req.user.id});
        res.status(201).json({ expense: newExpense, success: true })
    } catch(err){
        res.status(500).json({ error: err, success: false });
    }
};

const getexpenses = async (req, res) => {
    try {
      const expenses = await Expense.findAll({ where: { userId: req.user.id}});
    //   const expenses = await Expense.findAll();
      res.status(200).json({ expenses, success: true });
    } catch (err) {
      res.status(500).json({ error: err, success: false });
    }
};

const deleteexpense = async (req, res) => {
    const expenseid = req.params.expenseid;

    if(expenseid == undefined || expenseid.length === 0){
        return res.status(400).json({ success: false })
    }
  
    try {
      const noofrows = await Expense.destroy({
        where: { id: expenseid, userId: req.user.id }
      });
      if(noofrows === 0){
        return res.status(404).json({success: false, message: "Expense doesn't belongs to the user"})
      }
  
      res.status(200).json({ message: 'Expense deleted successfully', success: true });
    } catch (err) {
      res.status(500).json({ error: err, success: false, message: "Failed" });
    }
  };

module.exports = {
    addexpense,
    getexpenses,
    deleteexpense
}
