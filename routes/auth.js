var express = require('express');
var router = express.Router();

// add signIn package
var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('../models/account');

passport.serializeUser(function(user, done) {
done(null, user.id);
});

passport.deserializeUser(function(id, done) {
Account.findById(id, function(err, user) {
done(err, user);
    });
});

//get login - show login form
router.get('/login', function(req, res, next) {
var messages = req.session.messages || [];
//clear form
req.session.messages = [];

res.render('/login', {
    title: 'Login',
     user: req.user,
    messages: messages
    });
});

//post login validate
router.post('/login', passport.authenticate('local', {
successRedirect: '/movies',
failureRedirect: '/signIn/login',
failureMessage: 'Invalid Login'
}));

//get registration form
router.get('/registration', function(req, res, next) {
res.render('signIn/registration', {
    title: 'registration'
    });
});

//post registration save a user
router.post('/registration', function(req, res, next) {
    
Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
        return res.render('signIn/registration', { title: 'registration' });
    }
    else {
        req.login(account, function(err) {
            res.redirect('/movies');
        });
    }
});
});

//make public
module.exports = router, passport;