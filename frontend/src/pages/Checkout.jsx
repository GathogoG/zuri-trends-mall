import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Checkout.css'; 

const locationOptions = {
  Kenya: {
    cities: {
      'Nairobi': 200,
      'Mombasa': 300,
      'Kisumu': 250,
      'Eldoret': 280,
      'Nakuru': 270,
      'Meru': 320,
      'Thika': 290,
      'Kericho': 310,
    }
  },
  USA: {
    cities: {
      'New York': 50,
      'Los Angeles': 70,
      'Chicago': 60,
      'Houston': 65,
      'Phoenix': 55,
      'Philadelphia': 60,
      'San Antonio': 65,
      'San Diego': 70,
    }
  },
  // Add other countries as needed
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = location.state || {};

  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    nationality: '',
  });

  const [selectedCity, setSelectedCity] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (name === 'nationality') {
      setSelectedCity('');
      setDeliveryFee(0);
      setTotalAmount(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
    }

    if (name === 'city') {
      setSelectedCity(value);
      const cityFee = locationOptions[form.nationality]?.cities[value] || 0;
      setDeliveryFee(cityFee);
      setTotalAmount(cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + cityFee);
    }
  };

  const handleContinue = () => {
    navigate('/payment', {
      state: {
        deliveryDetails: form,
        deliveryFee,
        totalAmount,
        cart, // Include cart details
      },
    });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Checkout</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title">Your Cart Items</h3>
          {cart.length === 0 ? (
            <p className="text-center">Your cart is empty</p>
          ) : (
            <div className="list-group">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-thumbnail cart-image"
                  />
                  <div className="ml-3">
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="mb-1">Price: {item.price.toFixed(2)}</p>
                    <p className="mb-1">Quantity: {item.quantity}</p>
                    <p className="mb-1">Subtotal: {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <div className="text-right mt-3">
                <h4>Total: {totalAmount.toFixed(2)}</h4>
                <h4>Delivery Fee: {deliveryFee.toFixed(2)}</h4>
                <h4>Grand Total: {(totalAmount + deliveryFee).toFixed(2)}</h4>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Delivery Details</h3>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="nationality">Nationality</label>
              <select
                id="nationality"
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select Nationality</option>
                {Object.keys(locationOptions).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            {form.nationality && (
              <div className="form-group">
                <label htmlFor="city">City</label>
                <select
                  id="city"
                  name="city"
                  value={selectedCity}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select City</option>
                  {Object.keys(locationOptions[form.nationality]?.cities || {}).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              type="button"
              onClick={handleContinue}
              className="btn btn-primary"
            >
              Continue with Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
