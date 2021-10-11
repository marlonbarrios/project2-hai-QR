//require dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');


//iniitalize ezpress app
const app = express();
const haikusController = require('./controllers/haikus');
const { $where } = require('./models/haiku');

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


app.use('/haikus', haikusController)




const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
});