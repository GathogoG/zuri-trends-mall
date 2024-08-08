import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const sampleCards = [
  { id: '1', name: 'Visa', number: '**** **** **** 1234', expDate: '12/25' },
  { id: '2', name: 'MasterCard', number: '**** **** **** 5678', expDate: '11/24' },
  { id: '3', name: 'American Express', number: '**** **** **** 9012', expDate: '10/23' },
];

const mpesaOption = {
  id: '4',
  name: 'M-Pesa',
  icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/M-Pesa_Logo.png/640px-M-Pesa_Logo.png',
};

export default function PaymentPage() {
  const location = useLocation();
  const { deliveryDetails = {}, productDetails = {} } = location.state || {};

  const parsePrice = (priceStr) => parseFloat(priceStr.replace(/[^\d.-]/g, '')) || 0;
  const price = parsePrice(productDetails.price);
  const fee = parseFloat(deliveryDetails.fee) || 0;
  const totalAmount = (price + fee).toFixed(2);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const handleContinueToPayment = async () => {
    if (!selectedCard) {
      alert('Please select a payment method');
      return;
    }

    const paymentData = {
      amount: totalAmount,
      phone_number: '0115743312',
    };

    try {
      const response = await axios.post('http://localhost:5000/payments', paymentData);
      if (response.status === 201) {
        alert('Payment initiated. Please check your phone for the PIN prompt.');
      } else {
        alert('Failed to initiate payment');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('An error occurred while initiating payment');
    }
  };

  return (
    <div className="px-6 py-24 bg-white isolate sm:py-32 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Payment</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">Complete your payment details below.</p>
      </div>
      <div className="max-w-xl mx-auto mt-16 sm:mt-20">
        <div className="bg-gray-50 p-4 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-bold">Delivery Details</h3>
          <p>Name: {deliveryDetails.name}</p>
          <p>Email: {deliveryDetails.email}</p>
          <p>Phone: {deliveryDetails.phone}</p>
          <p>Address: {deliveryDetails.address}</p>
          <p>Location: {deliveryDetails.location}</p>
          <p>Delivery Fee: KSh {fee.toFixed(2).toLocaleString()}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-bold">{productDetails.title}</h3>
          <p className="text-gray-700 mb-2">{productDetails.description}</p>
          <p className="text-lg font-semibold">Price: KSh {price.toFixed(2).toLocaleString()}</p>
          <p className="text-lg font-semibold">Total Amount: KSh {totalAmount.toLocaleString()}</p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Product Images</h4>
            {productDetails.images.map((image, index) => (
              <img key={index} src={image} className="w-32 h-32 object-cover mt-2" alt={`Product ${index}`} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a Payment Method</h3>
          <ul className="space-y-4">
            {sampleCards.map((card) => (
              <li
                key={card.id}
                className={`p-4 border rounded-md cursor-pointer ${selectedCard?.id === card.id ? 'bg-gray-100 border-indigo-600' : 'border-gray-300'}`}
                onClick={() => handleCardSelect(card)}
              >
                <p className="text-lg font-medium">{card.name}</p>
                <p className="text-sm text-gray-600">Number: {card.number}</p>
                <p className="text-sm text-gray-600">Expiry Date: {card.expDate}</p>
              </li>
            ))}
            <li
              key={mpesaOption.id}
              className={`p-4 border rounded-md cursor-pointer ${selectedCard?.id === mpesaOption.id ? 'bg-gray-100 border-indigo-600' : 'border-gray-300'}`}
              onClick={() => handleCardSelect(mpesaOption)}
            >
              <div className="flex items-center">
                <img src={mpesaOption.icon} alt="M-Pesa" className="w-8 h-8 mr-2" />
                <p className="text-lg font-medium">{mpesaOption.name}</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <button
            type="button"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleContinueToPayment}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
