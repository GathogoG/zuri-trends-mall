import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './NewArrivals.css';

const NewArrivals = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Multi-Pocket Spaghetti Suspender Cargo Jumpsuit',
      image_path: 'https://i.pinimg.com/564x/47/9e/e4/479ee4b36b71b30d80cbb70b13b8b586.jpg',
      image_hover_path: 'https://blazingbeautyave.com/cdn/shop/files/CA003824_7_2000x@2x.progressive.jpg?v=1718508361', // Hover image
      price: 1000.00,
    },
    {
      id: 2,
      name: 'Cargo Pants',
      image_path: 'https://i.pinimg.com/736x/00/f1/a1/00f1a1712e09f65955e17512d5efca5a.jpg',
      image_hover_path: 'https://i.pinimg.com/736x/34/b5/bb/34b5bb91e76e7b71b6f9831c57a3c9c9.jpg', // Hover image
      price: 1500.00,
    },
    {
      id: 3,
      name: 'Jorts',
      image_path: 'https://i.pinimg.com/564x/2d/2a/7a/2d2a7ad9e3ea28851cf04d800001b521.jpg',
      image_hover_path: 'https://i.pinimg.com/564x/19/d2/16/19d21637e77fd7c0a9c5db770a43274f.jpg', // Hover image
      price: 2000.00,
    },
    // Add more products as needed
  ]);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <section className="new-arrivals">
      <h2 className="title">New Arrivals</h2>
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
            <p className="product-price">KES {product.price.toFixed(2)}</p>
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

export default NewArrivals;
