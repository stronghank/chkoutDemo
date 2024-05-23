var {paysessionmessage} = require('../models/paymessage');
const axios = require('axios');

const paymentsession = async (req, res) => {
    console.log(JSON.stringify(req.body));
    payData = paysessionmessage
    payData.amount = req.body.amount;
    payData.currency = req.body.currency;
    payData.customer.name = req.body.customer.name;
    payData.customer.email = req.body.customer.email;
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.sandbox.checkout.com/payment-sessions',
        headers: { 
          'Authorization': 'Bearer sk_sbox_kocur642y3sq5ien6dxjjzrumqo', 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(payData)
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res.status(200).json(response.data);
        })
        .catch((error) => {
            if(error.response){
                console.log("Error! " + error.response.status);
                console.log(JSON.stringify(error.response.data));
                res.status(422).json(error.response.data);
            }
        });
}

module.exports = paymentsession;