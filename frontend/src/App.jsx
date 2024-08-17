import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/wishlistContext'; // Import WishlistProvider
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentPage from './pages/Payment';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Wishlist from './pages/Wishlist';
import ContactUs from './pages/ContactUs';
import './App.css';

const productDetails = {
  title: 'Sample Product',
  description: 'This is a sample product description.',
  price: 1500,
};

const App = () => {
  const [deliveryDetails, setDeliveryDetails] = React.useState({ location: '', fee: 0 });
  const isLoggedIn = false; // This should be dynamically set based on authentication status

  return (
    <CartProvider>
      <WishlistProvider> {/* Wrap the router in the WishlistProvider */}
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path='/wishlist' element={<Wishlist/>}/>
              <Route path="/checkout" element={<Checkout setDeliveryDetails={setDeliveryDetails} />} />
              <Route path="/payment" element={<PaymentPage deliveryDetails={deliveryDetails} productDetails={productDetails} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {isLoggedIn && <Route path="/wishlist" element={<Wishlist />} />} {/* Conditional route based on login status */}
              <Route path="/contact-us" element={<ContactUs />} />
            </Routes>
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
