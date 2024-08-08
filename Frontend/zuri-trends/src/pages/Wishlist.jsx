import React from 'react'
import NavigationBar from '../components/NavigationBar';


const Wishlist = ({ wishlist, removeFromWishlist }) => {
  return (
    <div>
      <NavigationBar />
      <h2>Wishlist</h2>
      <ul>
        {wishlist.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => removeFromWishlist(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;