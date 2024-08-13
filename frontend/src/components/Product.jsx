import PropTypes from 'prop-types';
import './Product.css';
import { useNavigate } from 'react-router-dom';

const Product = ({ product, reviews }) => {
  const navigate = useNavigate();
  return (
    <div className="product">
      <img src={product.image_path} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{`Price: KES ${product.price.toLocaleString()}`}</p>
      <p>{`Available Quantity: ${product.quantity}`}</p>

      <h3>Reviews:</h3>
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.user_id}>
              <p>{`Rating: ${review.rating}`}</p>
              <p>{review.comment}</p>
            </li>
          ))
        ) : (
          <li>No reviews yet.</li>
        )}
      </ul>
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

Product.propTypes = {
  product: PropTypes.shape({
    image_path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      user_id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Product;
