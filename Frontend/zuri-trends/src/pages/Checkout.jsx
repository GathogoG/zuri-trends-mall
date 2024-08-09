import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const discountOffers = {
  DISCOUNT10: 0.10,
  SAVE20: 0.20,
};

const Checkout = () => {
  const { cart, getTotal } = useCart();
  const navigate = useNavigate();
  const shippingCost = 300;

  const [discountCode, setDiscountCode] = useState('');
  const [error, setError] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleDiscountCodeChange = (event) => {
    setDiscountCode(event.target.value);
  };

  const handleApplyDiscount = () => {
    setIsCalculating(true);

    setTimeout(() => {
      if (discountOffers.hasOwnProperty(discountCode)) {
        setError('');
        setDiscount(discountOffers[discountCode]);
      } else {
        setError('Invalid discount code');
        setDiscount(0);
      }
      setIsCalculating(false);
    }, 500);
  };

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  const subtotal = getTotal();
  const discountedTotal = subtotal * (1 - discount);
  const total = discountedTotal + shippingCost;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Checkout</h2>

        {cart.map((item) => (
          <div key={item.id} className="flex items-center mb-4">
            <div className="relative w-20 h-20">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white transform translate-x-1/2 -translate-y-1/2">
                {item.quantity}
              </div>
            </div>
            <div className="flex-1 ml-4">
              <h3 className="text-xl font-semibold text-gray-700">{item.title}</h3>
            </div>
            <p className="text-lg font-semibold text-gray-700">KSh{item.price}</p>
          </div>
        ))}

        <div className="mb-6">
          <input
            type="text"
            placeholder="Discount code"
            value={discountCode}
            onChange={handleDiscountCodeChange}
            className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-2`}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            onClick={handleApplyDiscount}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition w-full"
          >
            Apply
          </button>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-lg text-gray-700">Subtotal</span>
          <span className="text-lg font-semibold text-gray-700">KSh{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-lg text-gray-700">Shipping</span>
          <span className="text-lg font-semibold text-gray-700">KSh{shippingCost.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-6">
          <span className="text-lg font-semibold text-gray-800">Total</span>
          <span className="text-lg font-bold text-gray-800">
            {isCalculating ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 text-gray-800 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6a8 8 0 0116 0v4a8 8 0 01-16 0V6z"
                  />
                </svg>
                Calculating...
              </span>
            ) : (
              `KSh${total.toFixed(2)}`
            )}
          </span>
        </div>

        <button
          onClick={handleProceedToPayment}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;
