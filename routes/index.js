const express = require('express');
const router = express.Router();
const Product = require('../models/product');


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

module.exports = router;
