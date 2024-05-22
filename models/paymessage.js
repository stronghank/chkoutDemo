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
    "reference": "test_cko_lp_202404_1",
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

let googlepaymessage = {
    "source": {
      "type": "card",
      "number": "4242424242424242",
      "expiry_month": 1,
      "expiry_year": 2026,
      "cvv": 100
    },
    "amount": 1000,
    "currency": "HKD",
    "reference": "test_cko_lp_202404_1",
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

let idealpaymessage = {
    "source": {
      "type": "ideal",
      "description": "ORD50234E89",
      "language": "nl"
    },
    "amount": 0,
    "currency": "EUR",
    "reference": "iDEALabcde21",
    "success_url": "http://example.com/payments/success",
    "failure_url": "http://example.com/payments/fail"
};

module.exports = {cardpaymessage, googlepaymessage, idealpaymessage};
