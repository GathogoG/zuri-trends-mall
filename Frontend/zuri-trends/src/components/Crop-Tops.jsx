import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import { Button, Card, Container } from 'react-bootstrap';
import ProductReview from './ProductReview';

const CropTops = () => {
  // State to hold the list of crop tops
  const [cropTops, setCropTops] = useState([
    { id: 1, name: 'CropTop', price: '1500', image_path: 'https://i.pinimg.com/236x/04/d9/83/04d983798f0da6ceb6e70f2045db222c.jpg', quantity: '10', size: 'S, M, L', color: 'black and white'},
    { id: 2, name: 'CropTop', price: '1500', image_path: 'https://i.pinimg.com/236x/bb/63/bb/bb63bbb898f53a6875ef08883dacb38a.jpg', quantity: '5', size: 'S, M, L', color: 'black, green & white' },
    // Add more crop tops as needed
  ]);

  // Function to handle deleting a crop top
  const handleDelete = (id) => {
    setCropTops(cropTops.filter(cropTop => cropTop.id !== id));
  };

  return (
    <div>
      <NavigationBar />
      <Container>
        <div className='cards'>
          {cropTops.map(cropTop => (
            <Card key={cropTop.id} style={{ width: '18rem', margin: '10px' }}>
              <Card.Img variant="top" src={cropTop.image_path} />
              <Card.Body>
                <Card.Title>{cropTop.name}</Card.Title>
                <Card.Text>{cropTop.price}</Card.Text>
                <Card.Text>{cropTop.quantity}</Card.Text>
                <Card.Text>{cropTop.size}</Card.Text>
                <Card.Text>{cropTop.color}</Card.Text>
                <Button variant="secondary">Go somewhere</Button>
                <Button 
                  variant="danger" 
                  onClick={() => handleDelete(cropTop.id)} 
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

export default CropTops;
