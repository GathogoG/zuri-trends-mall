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
    title: 'SWIMMING SUITS',
    description: 'Stylish and comfortable swimming suits.',
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
  },
  5: {
    id: 5,
    images: [
      'https://i.pinimg.com/564x/d2/3c/ea/d23ceaa8e1ab5e1ae744cdb47d86979b.jpg',
      'https://i.pinimg.com/564x/9d/7c/ad/9d7cad5ede208c3585a65b40188b2576.jpg'
    ],
    title: 'Grey Sexy Collar Tank Top',
    description: 'Slight stretch tank top with embellishments.',
    price: 2500
  },
  6: {
    id: 6,
    images: [
      'https://i.pinimg.com/736x/c6/4d/4b/c64d4b48394ebdbec3e4cbc688f090bc.jpg',
      'https://i.pinimg.com/564x/ab/16/dd/ab16ddb974fd58cef55f965e48934384.jpg'
    ],
    title: 'EZwear Drop Shoulder Jacket & Pants',
    description: 'Two-piece teddy jacket and pants set.',
    price: 2200
  },
  7: {
    id: 7,
    images: [
      'https://i.pinimg.com/736x/64/1f/57/641f5798356599ea6e09e0b6294542eb.jpg',
      'https://i.pinimg.com/736x/e7/35/3e/e7353e86aa23ed3d52b0a103bd9bc7ac.jpg'
    ],
    title: 'Flared Pants',
    description: 'Fashionable and comfortable flared pants.',
    price: 1800
  },
  8: {
    id: 8,
    images: [
      'https://i.pinimg.com/564x/87/ad/1f/87ad1f7cb7c9ae3ba687a37e18d89327.jpg',
      'https://i.pinimg.com/564x/97/ea/aa/97eaaafdd757f8c25c452b941e1c24a1.jpg'
    ],
    title: 'Y2K Sweaters Women Long Sleeve',
    description: 'Grunge fairy gothic vintage pullover sweater.',
    price: 2700
  },
  9: {
    id: 9,
    images: [
      'https://i.pinimg.com/564x/5f/27/c6/5f27c66f1f458307728e6ff6047cf69d.jpg',
      'https://i.pinimg.com/736x/b8/7c/40/b87c40f17dbc9488ceb3de0f7984a765.jpg'
    ],
    title: 'Wide Leg Jeans in Washed Black',
    description: 'Stylish wide leg jeans.',
    price: 1900
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
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          {notification && (
            <div className="bg-green-200 text-green-800 p-3 rounded mb-4">
              Product added to cart!
            </div>
          )}
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 flex flex-col">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className="w-full h-auto mb-4 rounded-lg shadow-md"
                  alt={`Product ${index}`}
                />
              ))}
            </div>
            <div className="md:w-1/2 md:pl-6 p-4">
              <h2 className="text-3xl font-bold mb-2 text-gray-800">{product.title}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-semibold mb-4">KSh{product.price}</p>
              <div className="flex gap-4">
                <button
                  onClick={handleBuyNow}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300 text-lg font-semibold"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300 text-lg font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;