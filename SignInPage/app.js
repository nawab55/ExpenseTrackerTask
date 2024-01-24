const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const sequelize = require('./util/database');

const app = express();

const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Include your user routes
app.use('/user', userRoutes);

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
