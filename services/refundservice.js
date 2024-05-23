
const axios = require('axios');

const refundservice = async (req, res) => {
    url = 'https://api.sandbox.checkout.com/payments/' + req.body.paymentId + '/refunds'
    console.log('Refund url: ' + url);
    payData = {
        'amount':req.body.amount
    }
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
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
                if(error.response.status == 422){
                    res.status(422).json(error.response.data);
                }else if(error.response.status == 403){
                    res.status(403).json({'error_type':'403','error_codes':'Refund not allowed!'});
                }else{
                    res.status(502).json({'error_type':'502','error_codes':'Bad gateway!'});
                }   
            }
        });
}

module.exports = refundservice;