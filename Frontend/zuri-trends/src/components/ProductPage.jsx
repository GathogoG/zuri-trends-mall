import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import { useCart } from '../context/CartContext';

const productDetails = {
  1: {
    id: 1,
    images: [
      'https://tisapthreads.com/cdn/shop/files/DSC01433-Edit_706445e2-b971-4714-aa6d-ff4cface3b2d_375x_crop_center.jpg?v=1716358776',
      'https://tisapthreads.com/cdn/shop/files/DSC01412-Edit_f3b92ce7-9513-4793-bc2a-dc305a7c11bd_770x_crop_center.jpg?v=1716357980'
    ],
    title: 'RAVE SHORTS',
    description: 'High-quality rave shorts perfect for any occasion.',
    price: 1500
  },
  2: {
    id: 2,
    images: [
      'https://media1.popsugar-assets.com/files/thumbor/eDpPcum8XEN7TCOEPer_0miQIPc/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2017/05/30/864/n/24155406/93765e2a4dd599d7_0825031480044NEW_00_001/i/Billabong-Spring-Fever-Long-Sleeve-Springsuit.jpg',
      'https://www.sequence.co.nz/user/images/10751.jpg?t=1912101415'
    ],
    title: 'BIKINI',
    description: 'Stylish and comfortable bikini.',
    price: 1600
  },
  3: {
    id: 3,
    images: [
      'https://tisapthreads.com/cdn/shop/files/DSC01282-Edit-2_34d8e425-562c-4475-b092-529b38ac1a3a_375x_crop_center.jpg?v=1716358910',
      'https://tisapthreads.com/cdn/shop/files/DSC01300-Edit-2_8738648b-254f-45bd-8939-1a157678414c_375x_crop_center.jpg?v=1716358909'
    ],
    title: 'TISAP SHORTS',
    description: 'Comfortable and stylish shorts.',
    price: 2000
  },
  4: {
    id: 4,
    images: [
      'https://i.pinimg.com/736x/76/b9/ec/76b9eca569211813052630d50450af3b.jpg',
      'https://i.pinimg.com/originals/de/fa/66/defa6603a295e85e58696f214db1c85c.jpg'
    ],
    title: 'MAMI JEANS',
    description: 'Trendy and comfortable jeans.',
    price: 1600
  }
};

const ProductPage = () => {
  const { productId } = useParams();
  const product = productDetails[productId];
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [notification, setNotification] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    console.log(`Product ${productId} added to cart`);
    setNotification(true);

    setTimeout(() => {
      setNotification(false);
    }, 5000); 

    navigate('/cart'); // Navigate to the cart page
  };

  const handleBuyNow = () => {
    navigate('/delivery', { state: { productDetails: product } });
  };

  return (
    <div>
      <NavigationBar />
      <div className="bg-gray-100 min-h-screen p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4">
          {notification && (
            <div className="bg-green-200 text-green-800 p-3 rounded mb-4">
              Product added to cart!
            </div>
          )}
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              {product.images.map((image, index) => (
                <img key={index} src={image} className="w-full h-auto mb-4" alt={`Product ${index}`} />
              ))}
            </div>
            <div className="md:w-1/2 md:pl-4 p-9">
              <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-semibold mb-4">KSh{product.price}</p>
              <button
                onClick={handleBuyNow}
                className="bg-red-500 text-white px-6 py-3 rounded mr-2 hover:bg-red-700 text-lg font-semibold"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-700 text-lg font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

