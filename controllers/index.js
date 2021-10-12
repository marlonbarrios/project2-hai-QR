const express = require('express');
const indexRouter = express.Router();

// const bcrypt = require('bcrypt');
// const User = require('../models/user');



indexRouter.get('/', (req, res) => {
    console.log(req.session)
    res.render('home.ejs', { user: req.session.user});
});




module.exports = indexRouter; 