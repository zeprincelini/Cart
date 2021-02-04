const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const csrf = require('csurf');

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
  res.render('user/signup', {csrfToken: req.csrfToken()})
});

//Post Signup
router.post('/user/signup', async (req, res, next) => {
  res.redirect('/');
});

module.exports = router;
