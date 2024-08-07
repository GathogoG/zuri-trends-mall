import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD

// Import pages and components
=======
>>>>>>> 2e5ecdd (login)
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import LogOut from './pages/LogOut';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; 
import AboutUs from './components/AboutUs';
import TShirts from './components/T-Shirts';
import Croptops from './components/Crop-Tops';
import Hoodies from './components/Hoodies';
import Jackets from './components/Jackets';
import SweatShirts from './components/Sweat-Shirts';
import CropHoodies from './components/Crop-Hoodies';
import OrderHistory from './pages/OrderHistory';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import ProductReview from './components/ProductReview';
import ProductManager from './components/ProductManager';
=======
import ProductPage from './components/ProductPage';
import DeliveryPage from './pages/Delivery';
import PaymentPage from './pages/Payment';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
import LandingPage from './pages/LandingPage';
import NavigationBar from './components/NavigationBar'; 
=======
import ProductPage from './components/ProductPage';
import DeliveryPage from './pages/Delivery';
import PaymentPage from './pages/Payment';
<<<<<<< HEAD
>>>>>>> e21b4c9 (home)
=======
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
>>>>>>> 2e5ecdd (login)

const productDetails = {
  title: 'Sample Product',
  description: 'This is a sample product description.',
  price: 1500,
};
<<<<<<< HEAD
>>>>>>> e21b4c9 (home)
=======
import ProductReview from './components/ProductReview';
import ProductManager from './components/ProductManager';
>>>>>>> 3ab8bda (1)

function App() {
  const [deliveryDetails, setDeliveryDetails] = React.useState({ location: '', fee: 0 });

<<<<<<< HEAD
=======

function App() {
  const [deliveryDetails, setDeliveryDetails] = React.useState({ location: '', fee: 0 });
>>>>>>> e21b4c9 (home)
=======
>>>>>>> 2e5ecdd (login)
  return (
    <div className="app">
      <Router>
        <Routes>
<<<<<<< HEAD
<<<<<<< HEAD
          <Route path="/" element={<LandingPage />} /> {/* LandingPage as the default route */}
          <Route path="/home" element={<><NavigationBar /><Home /></>} />
          <Route path="/delivery" element={<><NavigationBar /><DeliveryPage setDeliveryDetails={setDeliveryDetails} /></>} />
          <Route path="/payment" element={<><NavigationBar /><PaymentPage deliveryDetails={deliveryDetails} productDetails={productDetails} /></>} />
          <Route path="/login" element={<><NavigationBar /><Login /></>} />
          <Route path="/signup" element={<><NavigationBar /><SignUp /></>} />
          <Route path="/catalog" element={<><NavigationBar /><Catalog /></>} />
          <Route path="/contact" element={<><NavigationBar /><Contact /></>} />
          <Route path="/t-shirts" element={<><NavigationBar /><TShirts /></>} />
          <Route path="/croptops" element={<><NavigationBar /><Croptops /></>} />
          <Route path="/hoodies" element={<><NavigationBar /><Hoodies /></>} />
          <Route path="/jackets" element={<><NavigationBar /><Jackets /></>} />
          <Route path="/sweatshirts" element={<><NavigationBar /><SweatShirts /></>} />
          <Route path="/crophoodies" element={<><NavigationBar /><CropHoodies /></>} />
          <Route path="/logout" element={<><NavigationBar /><LogOut /></>} />
          <Route path="/wishlist" element={<><NavigationBar /><Wishlist /></>} />
          <Route path="/cart" element={<><NavigationBar /><Cart /></>} />
          <Route path="/checkout" element={<><NavigationBar /><Checkout /></>} /> 
          <Route path="/about" element={<><NavigationBar /><AboutUs /></>} />
          <Route path="/orderhistory" element={<><NavigationBar /><OrderHistory /></>} />
          <Route path="/product/:productId" element={<><NavigationBar /><ProductPage /></>} />
=======
        <Route
=======
          <Route
>>>>>>> 2e5ecdd (login)
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
>>>>>>> e21b4c9 (home)
        </Routes>
      </Router>
    </div>
  );
}

export default App;
