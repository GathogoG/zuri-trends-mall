import './NewArrivals.css';

const NewArrivals = () => {
  return (
    <section className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="products">
        <div className="product">
          <img src="/public/assets/product1.jpg" alt="Product 1" />
          <h3>Black T-Shirt</h3>
          <p>$29.99</p>
        </div>
        <div className="product">
          <img src="/public/assets/product2.jpg" alt="Product 2" />
          <h3>Blue Jeans</h3>
          <p>$49.99</p>
        </div>
        <div className="product">
          <img src="/public/assets/product3.jpg" alt="Product 3" />
          <h3>Checkered Shirt</h3>
          <p>$39.99</p>
        </div>
        <div className="product">
          <img src="/public/assets/product4.jpg" alt="Product 4" />
          <h3>Orange Hoodie</h3>
          <p>$59.99</p>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
