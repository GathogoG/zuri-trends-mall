import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList'; 
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let url = 'http://127.0.0.1:5000/products';
      try {
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchProducts();
    fetchReviews();
  }, []);

  const handleAddReview = async (productId, review) => {
    try {
      await axios.post(`http://127.0.0.1:5000/products/${productId}/reviews`, review);
      setReviews((prevReviews) => [
        ...prevReviews,
        { ...review, product_id: productId },
      ]);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const getReviewsForProduct = (productId) => {
    return reviews.filter((review) => review.product_id === productId);
  };

  return (
    <div className="products-page">
      <ProductList
        products={products}
        reviews={reviews}
        onAddReview={handleAddReview}
      />
    </div>
  );
};

export default ProductsPage;
