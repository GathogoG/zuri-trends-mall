import React from 'react';
import { Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { logout } from '../assets/utils/auth' 

function NavigationBar() {
  return (
    <div className='navbar container-fluid navbar-expand-lg bg-body-tertiary'>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="CATALOG" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/t-shirts">T-SHIRTS</NavDropdown.Item>
                <NavDropdown.Item href="/croptops">CROP-TOPS</NavDropdown.Item>
                <NavDropdown.Item href="/hoodies">HOODIES</NavDropdown.Item>
                <NavDropdown.Item href="/jackets">JACKETS</NavDropdown.Item>
                <NavDropdown.Item href="/crophoodies">CROP-HOODIES</NavDropdown.Item>
                <NavDropdown.Item href="/sweatshirts">SWEAT-SHIRTS</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/contact">CONTACT</Nav.Link>
<<<<<<< HEAD
              <Nav.Link href="/home">HOME</Nav.Link> {/* Added Home link */}
=======
              <Nav.Link href="/home">HOME</Nav.Link> 
>>>>>>> refs/remotes/origin/main
            </Nav>
            <Nav>
              <Nav.Link href="/about">ABOUT US</Nav.Link>
              <Nav.Link eventKey={2} href="/cart">CART</Nav.Link>
              <Nav.Link eventKey={2} href="/wishlist">WISHLIST</Nav.Link>
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
<<<<<<< HEAD
                    <Button type="submit" className='submit'>Submit</Button>
=======
                    {/* <Button type="submit" className='submit'>Submit</Button> */}
>>>>>>> refs/remotes/origin/main
                  </Col>
                </Row>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
