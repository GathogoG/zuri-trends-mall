import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import ProductReview from './ProductReview';

const TShirts = () => {
  // State to hold the list of T-shirts
  const [tshirts, setTshirts] = useState([
    { id: 1, title: 'T-Shirt 1', name: 'T-Shirt Name 1', price: '$15.00', imgSrc: 'https://i.pinimg.com/736x/82/26/24/822624cff2e71a9d8a5e8c5571c3ed2b.jpg' },
    { id: 2, title: 'T-Shirt 2', name: 'T-Shirt Name 2', price: '$20.00', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZUtBS7iQ-pqu3lsMpZo_z6SW44NgUWFzsaA&s' },
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
      <Container>
        <div className='cards'>
          {tshirts.map(tshirt => (
            <Card key={tshirt.id} style={{ width: '18rem', margin: '10px' }}>
              <Card.Img variant="top" src={tshirt.imgSrc} />
              <Card.Body>
                <Card.Title>{tshirt.title}</Card.Title>
                <Card.Text>{tshirt.name}</Card.Text>
                <Card.Text>{tshirt.price}</Card.Text>
                <button onClick={() => navigate('/order')} variant="primary">More Info</button>
                <button onClick={() => navigate('/wishlist')} variant="primary">Add to Wishlist</button>
                <button onClick={() => navigate('/cart')} variant="primary">Add to Cart</button>
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
