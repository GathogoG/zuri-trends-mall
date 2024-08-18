import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './TopSelling.css';


const TopSelling = () => {
  // Manually define your products and images
  const products = [
    {
      id: 1,
      name: 'FLYDAY crewneck',
      price: 99.99,
      image_path: 'https://i.pinimg.com/564x/26/9e/60/269e60f2031af8d2f4f74f3d44ec7d70.jpg', // Primary image path
      image_hover_path: 'https://i.pinimg.com/564x/a3/20/71/a320712e3488133a5a336a9330d3159c.jpg' // Hover image path
    },
    {
      id: 2,
      name: 'Threebooy Y2k Pants Men Baggy Women Straight Trousers',
      price: 79.99,
      image_path: 'https://i.pinimg.com/564x/05/a0/67/05a0672375c9de29a438970552f11253.jpg',
      image_hover_path: 'https://i.pinimg.com/564x/2c/ab/97/2cab97ba6f0e6f2e4a968c3817e14ae2.jpg'
    },
    {
      id: 2,
      name: 'Matching crotchet outfit',
      price: 90.98,
      image_path: 'https://i.pinimg.com/564x/8e/ab/e2/8eabe296fb14d4a2a74374c9fe3c6dcd.jpg',
      image_hover_path: 'https://i.pinimg.com/736x/f5/54/65/f55465643ba4fcc43ae9e2c6db023c59.jpg'
    },
    // Add more products as needed
  ];

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/cart', { state: { product } }); 
  };

  return (
    <section className="top-selling">
      <h2 className="title">Top Selling</h2>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            <div className="product-image-wrapper">
              <img 
                src={product.image_path} 
                alt={product.name} 
                className="product-image primary"
              />
              <img 
                src={product.image_hover_path} 
                alt={`${product.name} hover`} 
                className="product-image hover"
              />
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price.toFixed(2)}</p>
            <button 
              onClick={() => handleAddToCart(product)} 
              className="add-to-cart-button"
            >
              Add to Cart
            </button>
          </div>
        ))}
        
      </div>
    </section>
  );
};

export default TopSelling;
