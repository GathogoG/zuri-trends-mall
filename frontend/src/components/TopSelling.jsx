import React from 'react';
import './TopSelling.css';

const TopSelling = () => {
  return (
    <section className="top-selling">
      <h2>Top Selling</h2>
      <div className="products">
        <div className="product">
          <img src="/public/assets/product5.jpg" alt="Product 5" />
          <h3>Green Jacket</h3>
          <p>$89.99</p>
        </div>
        <div className="product">
          <img src="/public/assets/product6.jpg" alt="Product 6" />
          <h3>Orange T-Shirt</h3>
          <p>$24.99</p>
        </div>
        <div className="product">
          <img src="/public/assets/product7.jpg" alt="Product 7" />
          <h3>Black Jeans</h3>
          <p>$69.99</p>
        </div>
      </div>
    </section>
  );
};

export default TopSelling;
