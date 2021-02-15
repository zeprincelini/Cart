const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { check, validationResult } = require('express-validator');
const csrf = require('csurf');
const passport = require('passport');

let csrfProtection = csrf({ cookie: true })
router.use(csrfProtection);


//Functions
// validationBodyRules = [
//   body('email', 'invalid email').isEmail(),
//   body('password', 'invalid password').isLength({min: 4})
// ];

// checkRules = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };


/* GET home page. */
router.get('/', async (req, res, next) => {
  await Product.find((err, doc) => {
    res.render('shop/index', { title: 'Express', myproducts: doc });
  }).lean();
 
});

//Get SignUp page
router.get('/user/signup', csrfProtection, (req, res, next) => {
  let message = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), message: message, hasError: message.length > 0})
});

//Post Signup
router.post('/user/signup', check('email', 'invalid Email').isEmail(), check('password', 'invalid passord').isLength({min:4}), (req, res, next) => {
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
router.get('/user/signin', (req, res) => {
  let message = req.flash('error');
  res.render('user/signin', {csrfToken: req.csrfToken(), message: message, hasError: message.length > 0});
});

//Post Signin
router.post('/user/signin', check('email', 'email incorrect').isEmail(), check('password', 'password incorrect').not().isEmpty(),(req, res, next) => {
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

//GET Profile
router.get('/user/profile', (req, res) => {
  res.render('user/profile', {message: 'initiated'});
})


module.exports = router;
