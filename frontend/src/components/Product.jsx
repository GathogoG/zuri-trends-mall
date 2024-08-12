import React from 'react';
import './Product.css';

const Product = ({ product, reviews }) => {
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
    </div>
  );
};

export default Product;
