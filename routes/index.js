var express = require('express');
var router = express.Router();
var payrequest = require('../services/payservice');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Checkout' });
});

//checkout get page
router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'Checkout Page' });
});

//checkout post api
router.post('/checkout', function(req, res, next) {
  console.log("Start calling checkout API here");
  payrequest(req,res);
});

module.exports = router;
