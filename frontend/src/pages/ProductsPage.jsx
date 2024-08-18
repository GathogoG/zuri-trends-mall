import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Product from '../components/Product';
import ProductList from '../components/ProductList'; 
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      let url = 'http://127.0.0.1:5000/products';
      if (searchQuery) {
        url += `?search=${encodeURIComponent(searchQuery)}`;
      }

      try {
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [searchQuery]);

  const getReviewsForProduct = (productId) => {
    return reviews.filter((review) => review.product_id === productId);
  };

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

  return (
    <div className="products-page">
      <ProductList
        products={products}
        reviews={reviews}
        onAddReview={handleAddReview}
      />
       {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((product) => (
          <Product
            key={product.id}
            product={product}
            reviews={getReviewsForProduct(product.id)}
            onAddReview={(review) => handleAddReview(product.id, review)}
          />
        ))
      )}
    </div>
  );
};

export default ProductsPage;
