//require dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');

// const { $where } = require('./models/haiku');
const expressSession = require('express-session');


//iniitalize ezpress app
const app = express();
const haikusController = require('./controllers/haikus.js');
const usersController = require('./controllers/users.js');
const indexController = require('./controllers/index.js');


// Configure App Settings
require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (error) => console.log('MongoDB Error ' + error.message));


app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(expressSession({
    secret: 'cknlkclnclnen', // this is used to digitally sign our session cookies (prevents forgery)
    resave: false, // this option updates session storage after request
    saveUninitialized: false 
}));

app.use('/haikus', haikusController)
app.use('/users', usersController)
app.use('/', indexController)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
});