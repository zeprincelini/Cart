const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const csrf = require('csurf');
const passport = require('passport');

let csrfProtection = csrf({ cookie: true })
router.use(csrfProtection);

//GET Profile
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('user/profile', {message: 'initiated'});
  });

  //GET Logout
router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    res.redirect('/');
  });

router.use('/', notLoggedIn, (req, res, next) => {
    next();
});

//Get SignUp page
router.get('/signup', csrfProtection, (req, res, next) => {
    let message = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), message: message, hasError: message.length > 0})
  });
  
  //Post Signup
  router.post('/signup', check('email', 'invalid Email').isEmail(), check('password', 'invalid passord').isLength({min:4}), (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let messages = [];
        errors.array().forEach((err) => {
            messages.push(err.msg);
        });
        req.flash('error', messages)
        res.redirect('/user/signup');
      }
      next();  
    }, passport.authenticate('local.signup', {
      successRedirect: '/user/profile',
      failureRedirect: '/user/signup',
      failureFlash: true
    }));
  
  //Get Sign In
  router.get('/signin', (req, res) => {
    let message = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), message: message, hasError: message.length > 0});
  });
  
  //Post Signin
  router.post('/signin', check('email', 'email incorrect').isEmail(), check('password', 'password incorrect').not().isEmpty(),(req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
      let messages = [];
        errors.array().forEach((err) => {
            messages.push(err.msg);
        });
        req.flash('error', messages)
        res.redirect('/user/signin');
    }
    next();
  }, passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
  }));


  module.exports = router;

  function isLoggedIn(req, res, next){
      if(req.isAuthenticated()){
          return next()
      }
      res.redirect('/');
  }

  function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
        return next()
    }
    res.redirect('/');
}