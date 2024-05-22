var express = require('express');
var router = express.Router();
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
  console.log(req.body);

  res.render('checkout', { title: 'Checkout Page' })
});

module.exports = router;
