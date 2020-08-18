const express = require('express');
const router  = express.Router();
const axios = require("axios");

/* GET home page */
router.post('/', (req, res, next) => {
  console.log("body received:", req.body)

  var endpoint = `https://api.playground.klarna.com/instantshopping/v1/authorizations/${req.body.authorization_token}/orders`;
  var username = 'usePK27126_8a4253efbe80r';
  var password = 'A6Xt0DcLnyysBoM8';
  var credentials = Buffer.from(username + ':' + password).toString('base64');
  
  console.log("credentials: ", credentials)

  var basicAuth = 'Basic ' + credentials;
  var body = {
    purchase_country: req.body.purchase_country,
    purchase_currency: req.body.purchase_currency,
    locale: req.body.locale,
    merchant_urls: {
      confirmation: "https://klarna-test-website.herokuapp.com/terms", // mandatory if not given at step #3, this value will ovewrite the one set through button generation
    },
    billing_address: req.body.billing_address,
    shipping_address: req.body.shipping_address,
    customer: req.body.customer,
    order_amount: req.body.order_amount,
    order_tax_amount: req.body.order_tax_amount,
    order_lines: req.body.order_lines,
    merchant_reference1: req.body.merchant_reference1,
  }
  axios.post(endpoint, {
    headers: { 'Authorization': + basicAuth }
  }, body).then(function(response) {

    console.log('authorizations called for ' + req.body.authorization_token);
    console.log("response", response)

  }).catch(function(error) {
    console.log('Error on Authentication: ', error);
  });

  res.json({message: "place order method being called"})
});

module.exports = router;
