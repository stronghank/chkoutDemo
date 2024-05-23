function refund(){
    var amount = parseFloat(document.getElementById('refund').value);
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
    }); // Order
    const responseJSON = await response.json();
  
    if (!response.ok) {
        alert(JSON.stringify(responseJSON.error_type + ' :' + responseJSON.error_codes));
    }else{
        alert('Refund is successful!');
    }
    })();
}