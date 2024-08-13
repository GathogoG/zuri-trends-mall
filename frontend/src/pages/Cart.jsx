import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";  

function Cart() {
  const { cart, addToCart, removeFromCart, getTotal } = useCart();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  return (
    <div className="cart-container">
      <div className="container mx-auto px-4 py-8">
        <h2 className="cart-header">Your Cart</h2>
        <div className="space-y-6">
          {cart.length === 0 ? (
            <p className="text-xl text-center text-gray-600">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="rounded-lg" />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-price">Price: KSh{item.price}</p>
                  <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                </div>
                <div className="cart-item-actions">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="decrease-btn"
                  >
                    -
                  </button>
                  <button
                    onClick={() => addToCart(item)}
                    className="increase-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-t-lg shadow-lg text-right">
        <h3 className="cart-total">Total: KSh{getTotal().toFixed(2)}</h3>
        <div className="cart-buttons">
          <button
            onClick={handleContinueShopping}
            className="continue-btn"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleProceedToCheckout}
            className="checkout-btn"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
