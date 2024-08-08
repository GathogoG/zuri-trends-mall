import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spinner, Card, Button } from 'react-bootstrap';
import NavigationBar from './NavigationBar';

function CropHoodies() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/products', { timeout: 10000 });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOrder = (product) => {
    navigate('/order', { state: { product } });
  };

  return (
    <div>
      <NavigationBar />
      <div>
        {loading ? (
          <Spinner animation="border" variant="light" />
        ) : (
          <div>
            {products.map((product) => (
              <Card key={product.id}>
                <Card.Img variant="top" src={product.image_path} alt={product.name} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>{product.price}</Card.Text>
                  <Button variant="primary" onClick={() => handleOrder(product)}>
                    Order
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CropHoodies;
