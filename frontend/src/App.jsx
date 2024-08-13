// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Wishlist from './pages/Wishlist';
import ContactUs from './pages/ContactUs';
import './App.css';

const App = () => {
  const isLoggedIn = false; 

  return (
    <CartProvider> 
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {isLoggedIn && <Route path="/wishlist" element={<Wishlist />} />}
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;