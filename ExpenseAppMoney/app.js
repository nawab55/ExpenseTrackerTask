const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const sequelize = require('./util/database');

const { User } = require('./models/usermodel');
const { Expense } = require('./models/expenses');
const { Order } = require('./models/orders');

const app = express();

const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Include your user routes
app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

// Sync the Sequelize models with the database
sequelize.sync()
    .then(() => {
        console.log('Database synced successfully');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.error('Unable to sync database:', err);
    });
