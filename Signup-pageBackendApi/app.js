const express = require('express');
const bodyParser = require('body-parser');
const signupRoutes = require('./routes/signuproutes');
const sequelize = require('./util/database');

const app = express();

const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', signupRoutes);

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

