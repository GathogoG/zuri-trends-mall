import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext'; 
import CustomerReviews from './CustomerReviews';
import './Product.css';
import './HeroSection.css';
import { useWishlist } from '../context/wishlistContext';

const Product = ({ product, reviews, onAddReview }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { addToWishlist } = useWishlist();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    navigate("/wishlist");
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === '') {
      alert("Please provide a rating and comment.");
      return;
    }

    const newReview = {
      user_id: Date.now(),
      product_id: product.id,  
      rating,
      comment,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        onAddReview(newReview);
        setRating(0);
        setComment('');
      } else {
        alert('Failed to submit the review.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the review.');
    }
  };

  return (
    <div className="product-page">
      <div className="product-card">
        <img className="product-image" src={product.image_path} alt={product.name} />
        <h2 className="product-title">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">{`Price: KES ${product.price.toLocaleString()}`}</p>
        <p className="product-quantity">{`Available Quantity: ${product.quantity}`}</p>

        <h3 className="reviews-title">Reviews:</h3>
        <ul className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <li key={review.user_id} className="review-item">
                <p className="review-rating">{`Rating: ${review.rating}`}</p>
                <p className="review-comment">{review.comment}</p>
              </li>
            ))
          ) : (
            <li className="no-reviews">No reviews yet.</li>
          )}
        </ul>

        <button onClick={handleAddToCart} className="btn add-to-cart-button">
          Add to Cart
        </button>
        <button onClick={handleAddToWishlist} className="btn add-to-wishlist-button">
          Add to Wishlist
        </button>
      </div>

      <CustomerReviews />

      <div className="review-form-container">
        <h3 className="review-form-title">Add Your Review</h3>
        <form onSubmit={handleSubmitReview} className="review-form">
          <label className="review-label">
            Rating:
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="review-select">
              <option value="0">Select Rating</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="review-label">
            Comment:
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="review-textarea" />
          </label>
          <button type="submit" className="btn submit-review-button">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    image_path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired, 
  }).isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      user_id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddReview: PropTypes.func.isRequired,
};

export default Product;
