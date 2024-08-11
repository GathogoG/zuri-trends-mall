import React from 'react';
import { Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { logout } from '../assets/utils/auth';

function NavigationBar() {
  const { getCartCount } = useCart(); 

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className='nav-brand'>HOME</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="CATALOG" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/products">ALL PRODUCTS</NavDropdown.Item>
              <NavDropdown.Item href="/t-shirts">T-SHIRTS</NavDropdown.Item>
              <NavDropdown.Item href="/croptops">CROP-TOPS</NavDropdown.Item>
              <NavDropdown.Item href="/hoodies">HOODIES</NavDropdown.Item>
              <NavDropdown.Item href="/jackets">JACKETS</NavDropdown.Item>
              <NavDropdown.Item href="/crophoodies">CROP-HOODIES</NavDropdown.Item>
              <NavDropdown.Item href="/sweatshirts">SWEAT-SHIRTS</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/order">ORDER</Nav.Link>
            <Nav.Link href="/contact">CONTACT</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/about">ABOUT US</Nav.Link>
            <Nav.Link href="/cart">
              CART ({getCartCount()}) 
            </Nav.Link>
            <Nav.Link href="/wishlist">WISHLIST</Nav.Link>
            <Nav.Link href="/login">LOGIN</Nav.Link>
            <Nav.Link onClick={logout}>LOGOUT</Nav.Link>
            <Form inline="true">
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit" className='submit'>Submit</Button>
                </Col>
              </Row>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
