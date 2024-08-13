import { useEffect, useState } from 'react';
import './NewArrivals.css';
import { useNavigate } from 'react-router-dom';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="products">
        {products.map(product => (
          <div className="product" key={product.id}>
            <img src={product.image_path} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
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
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
