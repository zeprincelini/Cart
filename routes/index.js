const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');


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

//Get Cart Route
router.get('/add-to-cart/:id', (req, res, next) => {
let productId = req.params.id;
let cart = new Cart(req.session.cart ? req.session.cart : {});

Product.findById(productId, (err, product) => {
  if(err){
    res.status('401');
    res.redirect('/')
  }
  cart.add(product, product.id);
  req.session.cart = cart;
  console.log(req.session.cart);
  res.redirect('/');
});
});

//Get Shopping Cart Page
router.get('/cart', (req, res, next) => {
  if(!req.session.cart){
    return res.render('shop/cart', {products: null});
  }
  let cart = new Cart(req.session.cart);
  res.render('shop/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
});

//Get CheckOut Page
router.get('/checkout', (req, res, next) => {
  if(!req.session.cart){
    res.redirect('/');
  }
  let cart = new Cart(req.session.cart);
  res.render('shop/checkout', {totalPrice: cart.totalPrice});
});

//Post CheckOut Page
router.post('/checkout', (req, res, next) => {
  
});

module.exports = router;
