import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css'; // Ensure you import your CSS file

function Cart() {
  const { cart, addToCart, removeFromCart, deleteFromCart, getTotal } = useCart();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items to your cart before proceeding to checkout.");
      return;
    }
    navigate('/checkout', { state: { cart } });
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="container my-5">
      <h2 className="text-4xl font-bold mb-8 text-center">Your Cart</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {cart.length === 0 ? (
          <p className="text-xl text-center text-gray-600">Your cart is empty</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="cart-card"
              >
                <div className="cart-image-container">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-image"
                  />
                </div>
                <div className="cart-content">
                  <h3 className="text-2xl font-semibold text-gray-700">{item.title}</h3>
                  <p className="text-lg text-gray-600 mb-1">Price: KSh {item.price}</p>
                  <p className="text-lg text-gray-600 mb-3">Quantity: {item.quantity}</p>
                </div>
                <div className="cart-actions">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    -
                  </button>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => deleteFromCart(item.id)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white p-6 rounded-t-lg shadow-lg text-right mt-6">
        <h3 className="text-3xl font-semibold mb-4">Total: KSh {getTotal().toFixed(2)}</h3>
        <div className="space-x-4">
          <button
            onClick={handleContinueShopping}
            className="continue-btn"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleProceedToCheckout}
            className={`px-6 py-3 rounded-lg text-white transition ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
