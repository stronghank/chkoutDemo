const urlParams = new URLSearchParams(window.location.search);
const paymentId = urlParams.get("cko-payment-id");

(async () => {
    const response = await fetch("https://api.sandbox.checkout.com/payments/" + paymentId, { method: "GET", 
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer sk_sbox_kocur642y3sq5ien6dxjjzrumqo"
        }
    }); // Order
    const responseJSON = await response.json();
  
    if (!response.ok) {
        console.log(responseJSON);
    }else{
        const ccy = responseJSON.currency;
        if(ccy == 'EUR'){
            document.getElementById('price1').innerText = '€8';
            document.getElementById('price2').innerText = '€5.5';
            document.getElementById('price3').innerText = '€4.5';
            document.getElementById('price4').innerText = 'Total (EUR)';
            document.getElementById('price5').innerText = '€18';
        }
    }
})();


function refund(){
    var amount = parseFloat(document.getElementById('refund').value);
    const re = /^[0-9/.]*$/;
    if (!re.test(amount)){
      alert("Only numbers is allowed!");
      return false;
    }

    amount = amount * 100;
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get("cko-payment-id");

    (async () => {
    const response = await fetch("/refund", { method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "amount": amount,
            "paymentId": paymentId
        })
    }); 
    const responseJSON = await response.json();
  
    if (!response.ok) {
        alert(JSON.stringify(responseJSON.error_type + ' : ' + responseJSON.error_codes));
    }else{
        alert('Refund is successful!');
    }
    })();
}