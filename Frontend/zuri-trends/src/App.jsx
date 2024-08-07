import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
<<<<<<< HEAD
import ProductReview from './components/ProductReview';
import ProductManager from './components/ProductManager';
=======
import ProductPage from './components/ProductPage';
import DeliveryPage from './pages/Delivery';
import PaymentPage from './pages/Payment';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';

const productDetails = {
  title: 'Sample Product',
  description: 'This is a sample product description.',
  price: 1500,
};
>>>>>>> e21b4c9 (home)

function App() {
  const [deliveryDetails, setDeliveryDetails] = React.useState({ location: '', fee: 0 });

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/delivery"
            element={<DeliveryPage setDeliveryDetails={setDeliveryDetails} />}
          />
          <Route
            path="/payment"
            element={
              <PaymentPage
                deliveryDetails={deliveryDetails}
                productDetails={productDetails}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> 
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
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
