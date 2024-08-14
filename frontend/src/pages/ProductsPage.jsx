import { useEffect, useState } from 'react';
import Product from '../components/Product';
import './ProductsPage.css';


const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));

    fetch('http://127.0.0.1:5000/reviews')
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, []);

  const getReviewsForProduct = (productId) => {
    return reviews.filter((review) => review.product_id === productId);
  };

  return (
    <div className="products-page">
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          reviews={getReviewsForProduct(product.id)}
        />
        
      ))}
      <button 
        onClick={() => navigate('/cart')} 
        style={{
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductsPage;
