import { useEffect, useState } from 'react';
import Product from '../components/Product';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));

    fetch('/api/reviews')
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
    </div>
  );
};

export default ProductsPage;
