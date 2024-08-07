import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeliveryPage from './Delivery';
import PaymentPage from './Payment';

const productDetails = {
  title: 'Sample Product',
  description: 'This is a sample product description.',
  price: 1500,
};

export default function CheckoutPage() {
  const [deliveryDetails, setDeliveryDetails] = useState({ name: '', email: '', location: '', fee: 0 });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<DeliveryPage setDeliveryDetails={setDeliveryDetails} />}
        />
        <Route
          path="/payment"
          element={<PaymentPage deliveryDetails={deliveryDetails} productDetails={productDetails} />}
        />
      </Routes>
    </Router>
  );
}
