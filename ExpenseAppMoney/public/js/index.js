// const Razorpay = require("razorpay");

async function addNewExpense(e){
    e.preventDefault();

    const expenseamount = document.getElementById('expenseamount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const expenseDetails = {
        expenseamount: expenseamount,
        description: description,
        category: category
    };

    try{
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/expense/addexpense', expenseDetails, { headers: {"Authorization": token}});
    
            console.log(response.data);
            addNewExpenseToUi(response.data.expense);

            // window.location.href ="../views/index.html";  // change the page on succesfull login
          
    } catch(err){
        // showError(err);
        console.log(err);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/expense/getexpenses', { headers: { "Authorization": token } })
        .then((response) => {
            if(response.status === 200){
                response.data.expenses.forEach(expense => {
                    addNewExpenseToUi(expense);
                });
            } else{
                throw new Error();
            }
        })
        .catch(err => {
            // showError(err);
            console.log(err);
        })
})

function addNewExpenseToUi(expense){
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += ` 
        <li id=${expenseElemId}>
            ${expense.expenseamount} - ${expense.category} - ${expense.description} 
            <button onclick='deleteExpense(event, ${expense.id})'>Delete Expense</button>
        </li>`
}

 // Function to delete an expense
 const deleteExpense = async (e, expenseid) => {
    try {
        const token = localStorage.getItem('token')
      const response = await axios.delete(`http://localhost:3000/expense/deleteexpense/${expenseid}`, { headers: {"Authorization": token}});
      const result = response.data;
      console.log(result);

      removeExpenseFromUI(expenseid);
    
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

function removeExpenseFromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}

document.getElementById('rzp-button1').onclick = async function(e){
    const token = localStorage.getItem('token');
    console.log(token);
    const response = await axios.get("http://localhost:3000/purchase/premiummembership", { headers: {"Authorization": token} });
    console.log(response);
    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function(response){
            await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id
            }, { headers: {"Authorization": token} });
            alert("You are a Premium User Now");
        }
    };
    const rzp1 = new Razorpay(options);
    
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function(response){
        console.log(response);
        alert('Something went wrong')
    });


}

