import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
<<<<<<< HEAD

// Import pages and components
=======
>>>>>>> 2e5ecdd (login)
=======

// Import pages and components
>>>>>>> 8a2a33b (authentication)
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
<<<<<<< HEAD
=======
>>>>>>> refs/remotes/origin/main
import ProductReview from './components/ProductReview';
import ProductManager from './components/ProductManager';
=======
=======
import ProductReview from './components/ProductReview';
import ProductManager from './components/ProductManager';
>>>>>>> refs/remotes/origin/main
import ProductPage from './components/ProductPage';
import DeliveryPage from './pages/Delivery';
import PaymentPage from './pages/Payment';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import LandingPage from './pages/LandingPage';
=======

import { Toaster } from 'react-hot-toast';
>>>>>>> 3a46b7e (done with login)
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
=======
import { Toaster } from 'react-hot-toast';
>>>>>>> d6540ae (added toaat message)
=======
import LandingPage from './pages/LandingPage'; // Import LandingPage
import NavigationBar from './components/NavigationBar'; // Import NavigationBar
>>>>>>> 8a2a33b (authentication)
=======
=======
>>>>>>> refs/remotes/origin/main
import LandingPage from './pages/LandingPage';
import NavigationBar from './components/NavigationBar'; 
>>>>>>> 33ce0ba (cart)

=======

import { Toaster } from 'react-hot-toast';
import NavigationBar from './components/NavigationBar'; 


>>>>>>> refs/remotes/origin/main
const productDetails = {
  title: 'Sample Product',
  description: 'This is a sample product description.',
  price: 1500,
};
<<<<<<< HEAD
>>>>>>> e21b4c9 (home)
=======
<<<<<<< HEAD
import ProductReview from './components/ProductReview';
import ProductManager from './components/ProductManager';
>>>>>>> 3ab8bda (1)
=======
>>>>>>> refs/remotes/origin/main
>>>>>>> refs/remotes/origin/main

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
      <Toaster />
      <Router>
        <Routes>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8a2a33b (authentication)
=======
>>>>>>> refs/remotes/origin/main
          <Route path="/" element={<LandingPage />} /> {/* LandingPage as the default route */}
=======
          
>>>>>>> 3a46b7e (done with login)
          <Route path="/home" element={<><NavigationBar /><Home /></>} />
          <Route path="/delivery" element={<><NavigationBar /><DeliveryPage setDeliveryDetails={setDeliveryDetails} /></>} />
          <Route path="/payment" element={<><NavigationBar /><PaymentPage deliveryDetails={deliveryDetails} productDetails={productDetails} /></>} />
<<<<<<< HEAD
          <Route path="/" element={<><Login /></>} />
          <Route path="/signup" element={<><SignUp /></>} />
=======
          <Route path="/login" element={<><NavigationBar /><Login /></>} />
          <Route path="/signup" element={<><NavigationBar /><SignUp /></>} />
=======
          
          <Route path="/home" element={<><NavigationBar /><Home /></>} />
          <Route path="/delivery" element={<><NavigationBar /><DeliveryPage setDeliveryDetails={setDeliveryDetails} /></>} />
          <Route path="/payment" element={<><NavigationBar /><PaymentPage deliveryDetails={deliveryDetails} productDetails={productDetails} /></>} />
          <Route path="/" element={<><Login /></>} />
          <Route path="/signup" element={<><SignUp /></>} />
>>>>>>> refs/remotes/origin/main
>>>>>>> refs/remotes/origin/main
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 33ce0ba (cart)
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
=======
          <Route path="/about" element={<><NavigationBar /><AboutUs /></>} />
          <Route path="/orderhistory" element={<><NavigationBar /><OrderHistory /></>} />
          <Route path="/product/:productId" element={<><NavigationBar /><ProductPage /></>} />
>>>>>>> 8a2a33b (authentication)
        </Routes>
      </Router>
    </div>
  );
}

export default App;
