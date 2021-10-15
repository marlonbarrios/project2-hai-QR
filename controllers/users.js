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


userRouter.get('/login', (req, res) => {
    res.render('login.ejs', { error: '' });
});

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


userRouter.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

userRouter.post('/signup', (req, res) => {
 
   req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
 
  User.create(req.body, (err, user) => {
   
      req.session.user = user._id
      console.log(user._id)
      res.redirect('/users/login');
  });
});

userRouter.get('/logout', (req, res) => {

    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/');
    });
});



userRouter.get('/dashboard', isAuthenticated, (req, res) => {
    User.findById(req.session.user, (err, user) => {
        Haiku.find({createdBy: user._id}, (err, haikus) => {
            res.render('dashboard.ejs', { user, haikus });
        })
       
    });
});


module.exports = userRouter;