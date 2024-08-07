import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Card({ images, title, text, productId }) {
  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <Link 
      to={`/product/${productId}`}
      className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
    >
      <img 
        src={currentImage} 
        className="object-cover w-full h-57" 
        alt={title}
        onMouseEnter={() => setCurrentImage(images[1])}
        onMouseLeave={() => setCurrentImage(images[0])}
      />
      <div className="p-4">
        <h5 className="mb-2 text-xl font-semibold">{title}</h5>
        <p className="text-gray-600">{text}</p>
      </div>
    </Link>
  );
}

export default Card;
