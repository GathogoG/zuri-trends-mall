import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import LogOut from './pages/LogOut';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import AboutUs from './components/AboutUs';
import TShirts from './components/T-Shirts';
import Croptops from './components/Crop-Tops';
import Hoodies from './components/Hoodies';
import Jackets from './components/Jackets';
import SweatShirts from './components/Sweat-Shirts';
import CropHoodies from './components/Crop-Hoodies';
import OrderHistory from './pages/OrderHistory';


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
        <Route path="/login" element={<LogIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/t-shirts" element={<TShirts />} />
          <Route path="/croptops" element={<Croptops />} />
          <Route path="/hoodies" element={<Hoodies />} />
          <Route path="/jackets" element={<Jackets />} />
          <Route path="/sweatshirts" element={<SweatShirts />} />
          <Route path="/crophoodies" element={<CropHoodies />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App