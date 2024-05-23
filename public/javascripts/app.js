/* global CheckoutWebComponents */
function initPayment(){
    var ccy = 'HKD';
    var amount = 15400;
    var loc = 'en-HK';
    let country = document.getElementById('country').value;
    if(country == 'NL'){
        ccy = 'EUR';
        amount = 1800;
        loc = 'nl';
    }
    customerName = document.getElementById('cc-name').value;
    customerEmail = document.getElementById('cc-email').value;

    (async () => {
    // Insert your public key here
    const PUBLIC_KEY = "pk_sbox_eecw76nhibprzlx5uizgjt7624h";
  
    const response = await fetch("/paymentsessions", { method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "amount": amount,
            "currency": ccy,
            "reference": "test_from_Hank_May_2024",
            "billing": {
                "address": {
                    "country": country
                }
            },
            "customer": {
                "name": customerName,
                "email": customerEmail
            },
            "processing_channel_id":"pc_5725joyl266ufmcluzvqtn2rc4",
            "success_url": "http://localhost:3000/payments/success",
            "failure_url": "http://localhost:3000/payments/failure"
        })
    }); // Order
    const paymentSession = await response.json();
  
    if (!response.ok) {
      console.error("Error creating payment session", paymentSession);
      return;
    }
  
    const checkout = await CheckoutWebComponents({
      publicKey: PUBLIC_KEY,
      environment: "sandbox",
      locale: loc,
      paymentSession,
      onReady: () => {
        console.log("onReady");
      },
      onPaymentCompleted: (_component, paymentResponse) => {
        console.log("Create Payment with PaymentId: ", paymentResponse.id);
      },
      onChange: (component) => {
        console.log(
          `onChange() -> isValid: "${component.isValid()}" for "${
            component.type
          }"`,
        );
      },
      onError: (component, error) => {
        console.log("onError", error, "Component", component.type);
      },
    });
  
    const flowComponent = checkout.create("flow");
  
    flowComponent.mount(document.getElementById("flow-container"));
  })();
  
  function triggerToast(id) {
    var element = document.getElementById(id);
    element.classList.add("show");
  
    setTimeout(function () {
      element.classList.remove("show");
    }, 5000);
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const paymentStatus = urlParams.get("status");
  const paymentId = urlParams.get("cko-payment-id");
  
  if (paymentStatus === "succeeded") {
    triggerToast("successToast");
  }
  
  if (paymentStatus === "failed") {
    triggerToast("failedToast");
  }
  
  if (paymentId) {
    console.log("Create Payment with PaymentId: ", paymentId);
  }
}

function setccy() {
    let x = document.getElementById('country').value;
    if(x == 'HK' ){
      document.getElementById('price1').innerText = '$68';
      document.getElementById('price2').innerText = '$48';
      document.getElementById('price3').innerText = '$38';
      document.getElementById('price4').innerText = 'Total (HKD)';
      document.getElementById('price5').innerText = '$154';
    }else if(x == 'NL'){
      document.getElementById('price1').innerText = '€8';
      document.getElementById('price2').innerText = '€5.5';
      document.getElementById('price3').innerText = '€4.5';
      document.getElementById('price4').innerText = 'Total (EUR)';
      document.getElementById('price5').innerText = '€18';
    }
  }