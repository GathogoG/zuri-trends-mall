import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/wishlists")
      .then((response) => response.json())
      .then((data) => setWishlist(data))
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, []);

  const addToWishlist = (item) => {
    fetch("http://127.0.0.1:5000/wishlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        setWishlist((prevWishlist) => [...prevWishlist, data]);
      })
      .catch((error) => console.error("Error adding to wishlist:", error));
  };

  const updateWishlistItem = (itemId, updates) => {
    fetch(`http://127.0.0.1:5000/wishlists/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        setWishlist((prevWishlist) =>
          prevWishlist.map((item) =>
            item.id === itemId ? updatedItem : item
          )
        );
      })
      .catch((error) => console.error("Error updating wishlist:", error));
  };

  const removeFromWishlist = (itemId) => {
    fetch(`http://127.0.0.1:5000/wishlists/${itemId}`, {
      method: "DELETE",
    })
      .then(() => {
        setWishlist((prevWishlist) =>
          prevWishlist.filter((item) => item.id !== itemId)
        );
      })
      .catch((error) => console.error("Error removing from wishlist:", error));
  };

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      <div className="wishlist-items">
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty</p>
        ) : (
          wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image_path} alt={item.title} />
              <div className="wishlist-item-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <button onClick={() => removeFromWishlist(item.id)}>
                  Remove
                </button>
                <button
                  onClick={() =>
                    updateWishlistItem(item.id, { quantity: item.quantity + 1 })
                  }
                >
                  Add One More
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="wishlist-actions">
        <button onClick={() => navigate("/products")}>Continue Shopping</button>
      </div>
    </div>
  );
}

export default Wishlist;

