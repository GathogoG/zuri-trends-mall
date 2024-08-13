import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import './Payment.css';

const sampleCards = [
  { id: '1', name: 'Visa', number: '**** **** **** 1234', expDate: '12/25', icon: faCcVisa },
  { id: '2', name: 'MasterCard', number: '**** **** **** 5678', expDate: '11/24', icon: faCcMastercard },
];

const mpesaOption = {
  id: 'mpesa',
  name: 'M-Pesa',
  icon: 'https://inspireip.com/wp-content/uploads/2022/12/m-pesa-768x561.png', // Updated image URL
};

const PaymentPage = () => {
  const location = useLocation();
  const { deliveryDetails, deliveryFee, totalAmount, cart } = location.state || {};
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const handleContinueToPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/payments', {
        amount: totalAmount + deliveryFee,
        phone_number: deliveryDetails?.phone, // Adjusted field to match backend
        user_id: deliveryDetails?.user_id, // Include user_id if required
      });

      console.log('Payment successful:', response.data);
      setLoading(false);
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="text-center mb-4">
          <h2 className="display-4">Payment</h2>
          <p className="lead">Complete your payment details below.</p>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {/* Delivery Details */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Delivery Details</h3>
                <ul className="list-unstyled">
                  <li><strong>Name:</strong> {deliveryDetails?.name}</li>
                  <li><strong>Phone:</strong> {deliveryDetails?.phone}</li>
                  <li><strong>Address:</strong> {deliveryDetails?.address}</li>
                  <li><strong>City:</strong> {deliveryDetails?.city}</li>
                  <li><strong>Postal Code:</strong> {deliveryDetails?.postalCode}</li>
                </ul>
                <h4 className="mt-3">Delivery Fee: KSh {deliveryFee.toFixed(2).toLocaleString()}</h4>
                <h4 className="mt-3">Total Amount: KSh {totalAmount.toFixed(2).toLocaleString()}</h4>
                <h4 className="mt-3">Grand Total: KSh {(totalAmount + deliveryFee).toFixed(2).toLocaleString()}</h4>
              </div>
            </div>

            {/* Cart Items */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Cart Items</h3>
                {cart.length === 0 ? (
                  <p className="text-center">No items in cart</p>
                ) : (
                  <div className="cart-items-container">
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item">
                        <img
                          src={item.image}
                          alt={item.title}
                        />
                        <div className="info">
                          <h5>{item.title}</h5>
                          <p>Price: KSh {item.price.toFixed(2).toLocaleString()}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Total: KSh {(item.price * item.quantity).toFixed(2).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Select Payment Method</h3>
                <div className="row">
                  {sampleCards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => handleCardSelect(card)}
                      className={`col-md-6 mb-3 payment-method-card ${selectedCard?.id === card.id ? 'selected' : ''}`}
                    >
                      <div className="icon-container">
                        <FontAwesomeIcon icon={card.icon} />
                      </div>
                      <div className="info-container">
                        <h4>{card.name}</h4>
                        <p>{card.number}</p>
                        <p><small>Expiry: {card.expDate}</small></p>
                      </div>
                    </div>
                  ))}
                  <div
                    onClick={() => handleCardSelect(mpesaOption)}
                    className={`col-md-6 mb-3 payment-method-card ${selectedCard?.id === mpesaOption.id ? 'selected' : ''}`}
                  >
                    <div className="text-center">
                      <img src={mpesaOption.icon} alt="M-Pesa" />
                      <h4 className="mt-2">{mpesaOption.name}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinueToPayment}
              className="btn btn-primary btn-lg w-100"
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay KSh ${(totalAmount + deliveryFee).toLocaleString()}`}
            </button>
            {error && <p className="text-danger text-center mt-3">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
