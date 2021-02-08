const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const csrf = require('csurf');
const passport = require('passport');

let csrfProtection = csrf({ cookie: true })
router.use(csrfProtection);

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
router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

//GET Profile
router.get('/user/profile', (req, res) => {
  res.render('user/profile', {message: 'initiated'});
})

module.exports = router;
