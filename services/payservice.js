var {cardpaymessage, googlepaymessage, idealpaymessage, googletoken} = require('../models/paymessage');
const axios = require('axios');

const payrequest = async(req,res) =>{
    payMethod = req.body.paymentMethod;
    payData = {};
    payToken = {};
    console.log("Payrequest started. Payment Method: " + payMethod);
    //Set source for different payment method
    if(payMethod == 'card'){
        payData = cardpaymessage;
        payData.source.name = req.body.cardName;
        payData.source.number = req.body.cardNumber;
        payData.source.cvv = req.body.cardCVV;
        payData.source.expiry_month = req.body.cardExpDt.substring(0,1) == '0'? req.body.cardExpDt.substring(1,2):req.body.cardExpDt.substring(0,2);
        payData.source.expiry_year = req.body.cardExpDt.length == 5? '20' + req.body.cardExpDt.substring(3,5): '20' + req.body.cardExpDt.substring(2,4);
    }else if(payMethod == 'googlepay'){
        console.log(JSON.stringify(req.body));
        payToken = googletoken;
        payToken.token_data = JSON.parse(req.body.paymentToken);
        console.log(JSON.stringify(payToken));
        payData = googlepaymessage;
    }else if(payMethod == 'ideal'){
        payData = idealpaymessage;
        payData.source.description = 'ORD240522ABCD';
    }
    //Set currency and amount, here the amount is hard coded as per requirement 
    if(req.body.country == 'HK'){
        payData.currency = 'HKD';
        payData.amount = 154;
    }else if(req.body.country == 'NL'){
        payData.currency = 'EUR';
        payData.amount = 18;
    }
    //Hard code the reference field here
    //payData.reference = 'test_from_Hank_May_2024';
    //Other fields like processing_channel_id are using the default values in ../models/paymessage

    //Setup POST request
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.sandbox.checkout.com/payments',
        headers: { 
          'Authorization': 'Bearer sk_sbox_txpyg4zdo4pvb42jiag4dp4qcye', 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(payData)
    };

    //Call Checkout API
    if(payMethod == 'card'){
        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                res.status(200).json({status:response.data.status, amount:response.data.amount,currency:response.data.currency});
            })
            .catch((error) => {
                if(error.response){
                    console.log("Error! " + error.response.status);
                    console.log(JSON.stringify(error.response.data));
                    res.status(422).json(error.response.data);
                }
            });
    }else if(payMethod == 'ideal'){
        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                //res.status(200).json({status:response.data.status, amount:response.data.amount,currency:response.data.currency});
                res.redirect(response.data._links.redirect.href);
            })
            .catch((error) => {
                if(error.response){
                    console.log("Error! " + error.response.status);
                    console.log(JSON.stringify(error.response.data));
                    res.status(422).json(error.response.data);
                }
            });
    }else if(payMethod == 'googlepay'){
        //Google pay token request
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.sandbox.checkout.com/tokens',
            headers: { 
              'Authorization': 'Bearer pk_sbox_kms5vhdb66lgxsgzlgv4dgy3ziy', 
              'Content-Type': 'application/json'
            },
            data : JSON.stringify(payToken)
        };
        await axios.request(config)
            .then((response) => {
                payData.source.token = response.data.token;
                console.log(JSON.stringify(response.data));
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://api.sandbox.checkout.com/payments',
                    headers: { 
                      'Authorization': 'Bearer sk_sbox_txpyg4zdo4pvb42jiag4dp4qcye', 
                      'Content-Type': 'application/json'
                    },
                    data : JSON.stringify(payData)
                };
                //Google pay payment request
                axios.request(config)
                    .then((response) => {
                    console.log(JSON.stringify(response.data));
                    res.status(200).json({status:response.data.status, amount:response.data.amount,currency:response.data.currency});
                })
                .catch((error) => {
                    if(error.response){
                        console.log("Error! " + error.response.status);
                        console.log(JSON.stringify(error.response.data));
                        res.status(422).json(error.response.data);
                    }
                });
            })
            .catch((error) => {
                if(error.response){
                    console.log("Error! " + error.response.status);
                    console.log(JSON.stringify(error.response.data));
                    res.status(422).json(error.response.data);
                }
            });
    }
}



module.exports = payrequest