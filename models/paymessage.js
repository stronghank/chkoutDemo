let paysessionmessage = {
    "amount": 1000,
    "currency": "GBP",
    "reference": "test_from_Hank_May_2024",
    "billing": {
      "address": {
        "country": "HK"
      }
    },
    "customer": {
      "name": "Jia Tsang",
      "email": "jia.tsang@example.com"
    },
    "3ds": {
        "enabled": true,
        "attempt_n3d": false,
        "challenge_indicator": "no_preference",
        "exemption": "low_value",
        "allow_upgrade": true
    },
    "processing_channel_id":"pc_5725joyl266ufmcluzvqtn2rc4",
    "success_url": "http://localhost:3000/payments/success",
    "failure_url": "http://localhost:3000/payments/failure"
  }

let cardpaymessage = {
    "source": {
      "type": "card",
      "number": "4242424242424242",
      "expiry_month": 1,
      "expiry_year": 2026,
      "cvv": 100
    },
    "amount": 1000,
    "currency": "HKD",
    "reference": "test_from_Hank_May_2024",
    "capture": false,
    "3ds": {
      "enabled": false,
      "attempt_n3d": false
    },
    "processing_channel_id": "pc_2vhgz2ikd6hele43rwcgvwuqju",
    "metadata": {
      "udf4": "IE Test"
    }
};

let googletoken = {
    "type": "googlepay",
    "token_data": {
      "protocolVersion": "ECv1",
      "signature": "TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
      "signedMessage": "{\"encryptedMessage\": \"ZW5jcnlwdGVkTWVzc2FnZQ==\", \"ephemeralPublicKey\": \"ZXBoZW1lcmFsUHVibGljS2V5\", \"tag\": \"c2lnbmF0dXJl\"}"
    }
};

let googlepaymessage = {
    "source": {
      "type": "token",
      "token": "tok_lrn2umaznynuvkcjc6unno663u"
    },
    "amount": 1234,
    "currency": "GBP",
    "3ds": {
      "enabled": true
    }
};

let idealpaymessage = {
    "source": {
      "type": "ideal",
      "description": "ORD50234E89",
      "language": "nl"
    },
    "amount": 0,
    "currency": "EUR",
    "reference": "test_from_Hank_May_2024",
    "success_url": "http://example.com/payments/success",
    "failure_url": "http://example.com/payments/fail"
};

module.exports = {paysessionmessage, cardpaymessage, googlepaymessage, idealpaymessage, googletoken};
