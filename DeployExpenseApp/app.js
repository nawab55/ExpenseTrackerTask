const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');


const app = express();

const dotenv = require("dotenv")
dotenv.config();

const cors = require('cors');

app.use(cors());

const sequelize = require('./util/database');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumFeatureRoutes = require('./routes/premiumfeature');
const resetPasswordRoutes = require('./routes/resetpassword')

const { User } = require('./models/usermodel');
const { Expense } = require('./models/expenses');
const { Order } = require('./models/orders');
const Forgotpassword = require('./models/forgotpassword');


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
)

app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

// Include your user routes
app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumFeatureRoutes);
app.use('/password', resetPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

const port = process.env.PORT || 3000;
// Sync the Sequelize models with the database
sequelize.sync()
    .then(() => {
        console.log('Database synced successfully');
        app.listen(port, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.error('Unable to sync database:', err);
    });
