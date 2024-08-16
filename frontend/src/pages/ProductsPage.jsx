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

  const handleAddReview = (productId, review) => {
    setReviews((prevReviews) => [
      ...prevReviews,
      { ...review, product_id: productId },
    ]);

    
    fetch(`http://127.0.0.1:5000/products/${productId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
  };

  return (
    <div className="products-page">
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          reviews={getReviewsForProduct(product.id)}
          onAddReview={(review) => handleAddReview(product.id, review)}
        />
      ))}
    </div>
  );
};

export default ProductsPage;
