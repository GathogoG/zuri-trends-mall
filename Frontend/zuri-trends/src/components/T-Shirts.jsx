import React, { useState } from 'react';
import '../index.css'
import NavigationBar from './NavigationBar';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import ProductReview from './ProductReview';

const TShirts = () => {
  // State to hold the list of T-shirts
  const [tshirts, setTshirts] = useState([
    { id: 1, title: 'T-Shirt 1', name: 'T-Shirt Name 1', price: '2000', imgSrc: 'https://i.pinimg.com/564x/53/01/40/5301400dd023e2053f8cc7895dcedbb6.jpg' },
    { id: 2, title: 'T-Shirt 2', name: 'T-Shirt Name 2', price: '2000', imgSrc: 'https://i.pinimg.com/236x/16/5c/25/165c25354dad6eb54311077430da11ee.jpg' },
    { id: 3, title: 'T-Shirt 3', name: 'T-Shirt Name 3', price: '1200', imgSrc: 'https://images.pexels.com/photos/6347892/pexels-photo-6347892.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 4, title: 'T-Shirt 4', name: 'T-Shirt Name 4', price: '2000', imgSrc: 'https://i.pinimg.com/236x/71/a0/1e/71a01ebe169f0e79275c08717b952daf.jpg' },
    // Add more T-shirts as needed
  ]);
  const navigate = useNavigate();

  // Function to handle deleting a T-shirt
  const handleDelete = (id) => {
    setTshirts(tshirts.filter(tshirt => tshirt.id !== id));
  };



  return (
    <div>
      <NavigationBar />
      <Container className='t-shirts'>
        <div className='cards'>
          {tshirts.map(tshirt => (
            <Card key={tshirt.id} style={{ width: '18rem', margin: '10px' }}>
              <Card.Img variant="top" src={tshirt.imgSrc} />
              <Card.Body>
                <Card.Title>{tshirt.title}</Card.Title>
                <Card.Text>{tshirt.name}</Card.Text>
                <Card.Text>{tshirt.price}</Card.Text>
                <button onClick={() => navigate('/order')}>More Info</button>
                <button onClick={() => navigate('/wishlist')}>Add to Wishlist</button>
                <button onClick={() => navigate('/cart')} >Add to Cart</button>
                <Button 
                  variant="danger" 
                  onClick={() => handleDelete(tshirt.id)} 
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </Button>
                <ProductReview/>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TShirts;
