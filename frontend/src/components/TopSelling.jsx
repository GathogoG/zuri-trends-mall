import  { useEffect, useState } from 'react';
import './TopSelling.css';


const TopSelling = () => {
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    fetch('http://127.0.0.1:5000/products')
      .then(response => response.json())
      .then(data => {
        const topSellingProducts = data.slice(0, 4); 
        setProducts(topSellingProducts);
      })
      .catch(error => console.error('Error fetching top-selling products:', error));
  }, []);

  return (
    <section className="top-selling">
      <h2>Top Selling</h2>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            <img src={product.image_path} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{`$${product.price.toFixed(2)}`}</p>
          </div>
        ))}
        
      </div>
    </section>
  );
};

export default TopSelling;
