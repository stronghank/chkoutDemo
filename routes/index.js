var express = require('express');
var router = express.Router();
var payrequest = require('../services/payservice');
var paymentsession = require('../services/paymentsession');
var refundservice = require('../services/refundservice')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Checkout' });
});

//self checkout get page (implemented checkout.com api by myself)
router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'Checkout Page' });
});

//checkout post api
router.post('/checkout', function(req, res, next) {
  console.log("Start calling checkout API here");
  try{
    payrequest(req,res);
  }catch(error){
    console.error(error);
  }
  
});

//create payment-sessions
router.post('/paymentsessions', function(req, res, next) {
  console.log("Start calling Payment Session API");
  console.log(req.body);
  try{
    paymentsession(req,res);
  }catch(error){
    console.error(error);
  }
});

//refund
router.post('/refund',function(req, res, next){
  console.log("Start calling Refund API");
  console.log(req.body);
  try{
    refundservice(req,res);
  }catch(error){
    console.error(error);
  }
});

//redirect links
router.get('/payments/success', function(req, res, next) {
  res.render('success', { title: 'Payment is Successful！' });
});
router.get('/payments/failure', function(req, res, next) {
  res.render('failure', { title: 'Payment is Successful！' });
});

//get webhooks
router.post('/getwebhooks',function(req, res, next){
  console.log("Webhook received!");
  console.log(req.body);
});


module.exports = router;
