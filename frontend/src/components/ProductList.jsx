import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Product from './Product'; 
import './ProductList.css'; 

const ProductList = ({ products, reviews, onAddReview }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2; 

  // Calculate indices for slicing the products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="product-list">
      <div className="pagination-controls">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {currentProducts.length > 0 ? (
        currentProducts.map(product => (
          <Product 
            key={product.id} 
            product={product}
            reviews={reviews.filter(review => review.product_id === product.id)}
            onAddReview={(review) => onAddReview(product.id, review)}
          />
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image_path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      user_id: PropTypes.number.isRequired,
      product_id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddReview: PropTypes.func.isRequired,
};

export default ProductList;
