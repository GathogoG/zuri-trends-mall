import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className='nav-brand'>ZURI TRENDS</Navbar.Brand>
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
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/about">ABOUT US</Nav.Link>
            <Nav.Link href="/cart">CART</Nav.Link>
            <Nav.Link href="/wishlist">WISHLIST</Nav.Link>
            <Nav.Link href="/logout">LOGOUT</Nav.Link>
            <Nav.Link href="/orderhistory">ORDER HISTORY</Nav.Link>
          </Nav>
          <Form className="d-flex ms-auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className="me-2"
            />
            <Button type="submit" className='submit'>Submit</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
