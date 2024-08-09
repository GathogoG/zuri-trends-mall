import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ productId, productName }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:5000/products', { timeout: 10000 })
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [productId]);

  const handleMoreInfo = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToWishlist = (productId) => {
    navigate(`/wishlist/${productId}`);
  };

  const handleAddToCart = (productId) => {
    navigate(`/cart/${productId}`);
  };

  return (
    <div>
      <h2>{productName}</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image_path} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onClick={() => handleMoreInfo(product.id)}>More Info</button>
            <button onClick={() => handleAddToWishlist(product.id)}>Add to Wishlist</button>
            <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
