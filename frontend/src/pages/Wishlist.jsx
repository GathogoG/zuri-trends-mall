import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/wishlistContext';
import './Wishlist.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    // If needed, you can fetch wishlist items from the server and update context here
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    handleDeleteFromWishlist(item.id);
  };

  const handleDeleteFromWishlist = (id) => {
    removeFromWishlist(id);
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleNavigateToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="container my-5">
      <h2 className="text-4xl font-bold mb-8 text-center">Your Wishlist</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {wishlist.length === 0 ? (
          <p className="text-xl text-center text-gray-600">Your wishlist is empty</p>
        ) : (
          <div className="space-y-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="wishlist-card"
              >
                <img
                  src={item.image_path} // Assuming your item has an image_path field
                  alt={item.name}
                  className="wishlist-image"
                />
                <div className="wishlist-content">
                  <h3 className="text-2xl font-semibold text-gray-700">{item.name}</h3>
                  <p className="text-lg text-gray-600 mb-1">Price: KSh {item.price ? item.price.toFixed(2) : '0.00'}</p>
                </div>
                <div className="wishlist-actions">
                  <button
                    onClick={() => handleDeleteFromWishlist(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white p-6 rounded-t-lg shadow-lg text-right mt-6">
        <div className="space-x-4">
          <button
            onClick={handleContinueShopping}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleNavigateToCart}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;