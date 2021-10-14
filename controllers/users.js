const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Haiku = require('../models/haiku');

const isAuthenticated = require('../utilities/auth')




userRouter.get('/users/delete', async (req, res) => {
    await User.deleteMany({});
    res.redirect('/');
});

// present user with login page
userRouter.get('/login', (req, res) => {
    res.render('login.ejs', { error: '' });
});

// handle form submission to login
userRouter.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {

        if(!foundUser) {
            return res.render('login.ejs', {error: 'Invalid Credentials'});
        }

        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password);

        if(!isMatched) {
            return res.render('login.ejs', {error: 'Invalid Credentials'});
        }

        req.session.user = foundUser._id;

        res.redirect('/users/dashboard')
    });
});

// present user with signup page
userRouter.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

userRouter.post('/signup', (req, res) => {
   // 0) Perform a db lookup to determine if username exist 
  // 1) Hash the password
   req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  // 2) Save the user data to the database with the hashed version of the password
  User.create(req.body, (err, user) => {
      // 4) login with a session and then send the user a dashboard
      req.session.user = user.id
      res.redirect('/users/login');
  });
});

userRouter.get('/logout', (req, res) => {

    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/');
    });
});

// Protected Route

userRouter.get('/dashboard', isAuthenticated, (req, res) => {
    User.findById(req.session.user, (err, user) => {
        Haiku.find({createdBy: user._id}, (err, haikus) => {
            res.render('dashboard.ejs', { user, haikus });
        })
       
    });
});

// Utility Functions

// // Auth middleware
// function isAuthenticated(req, res, next) {
//     if(!req.session.user) { // user is not logged in
//         return res.redirect('/login');
//     } 
//     next(); // user is authenticated, keep moving on to the next step
// }


// INDUCES

module.exports = userRouter;