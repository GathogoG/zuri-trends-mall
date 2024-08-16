import React, { useState } from 'react';
import axios from 'axios';


const PaymentComponent = () => {
  
  const [amount, setAmount] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mpesaPin, setMpesaPin] = useState(''); 
  const [paymentStatus, setPaymentStatus] = useState(null); 
  const [error, setError] = useState(null); 

 
  const handlePayment = async (e) => {
    e.preventDefault(); 

    
    if (!amount || !phoneNumber || !mpesaPin) {
      setError('All fields are required');
      return;
    }

    try {
      
      const response = await axios.post('http://127.0.0.1:5000/payments', {
        amount: parseFloat(amount),
        phone_number: phoneNumber 
      });


      setPaymentStatus('Payment initiated. Please authorize the payment on your MPesa app.');
    } catch (err) {

      setError('Payment initiation failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>MPesa Payment</h1>
      <form onSubmit={handlePayment}>
        {/* Input field for payment amount */}
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)} 
              required
            />
          </label>
        </div>
        {/* Input field for phone number */}
        <div>
          <label>
            Phone Number:
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </label>
        </div>
        {/* Input field for M-Pesa PIN (for demonstration purposes) */}
        <div>
          <label>
            MPesa PIN:
            <input
              type="password"
              value={mpesaPin}
              onChange={(e) => setMpesaPin(e.target.value)} // Update MPesa PIN state on change
              required
            />
          </label>
        </div>
        {/* Submit button to initiate the payment */}
        <button type="submit">Pay</button>
      </form>
      {/* Display payment status if available */}
      {paymentStatus && <p>{paymentStatus}</p>}
      {/* Display error message if an error occurs */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PaymentComponent;