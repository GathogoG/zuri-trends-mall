import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, addToCart, removeFromCart, getTotal } = useCart();
  const navigate = useNavigate();

  const handleProceedToDelivery = () => {
    navigate("/delivery", { state: { cartDetails: cart, total: getTotal() } });
  };

  const handleContinueShopping = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
              Your Cart
            </h2>
            <div className="space-y-6">
              {cart.length === 0 ? (
                <p className="text-xl text-center text-gray-600">
                  Your cart is empty
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200"
                  >
                    <img
                      src={item.images_path[0]} 
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 ml-4">
                      <h3 className="text-xl font-semibold text-gray-700">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        -
                      </button>
                      <p className="text-lg font-medium text-gray-700">
                        {item.quantity}
                      </p>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      KSh{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-t-lg shadow-lg text-right">
        <h3 className="text-3xl font-semibold mb-4 text-gray-800">
          Total: KSh{getTotal().toFixed(2)}
        </h3>
        <div className="space-x-4">
          <button
            onClick={handleContinueShopping}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleProceedToDelivery}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Proceed to Delivery
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
