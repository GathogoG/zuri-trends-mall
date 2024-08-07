import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const deliveryOptionsByNationality = {
  Kenya: {
    'Nairobi': 200,
    'Mombasa': 300,
    'Kisumu': 250,
    'Eldoret': 280,
    'Nakuru': 270,
    'Meru': 320,
    'Thika': 290,
    'Kericho': 310,
  },
  USA: {
    'New York': 50,
    'Los Angeles': 70,
    'Chicago': 60,
  },
  UK: {
    'London': 80,
    'Manchester': 90,
    'Birmingham': 85,
  }
};

const nationalities = Object.keys(deliveryOptionsByNationality);

export default function DeliveryPage({ setDeliveryDetails }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Access the product details from location.state
  const productDetails = location.state?.productDetails || {};
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [nationality, setNationality] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryOptions, setDeliveryOptions] = useState({});

  useEffect(() => {
    if (nationality) {
      setDeliveryOptions(deliveryOptionsByNationality[nationality] || {});
      setDeliveryLocation('');
      setDeliveryFee(0);
    }
  }, [nationality]);

  const handleNationalityChange = (e) => {
    setNationality(e.target.value);
  };

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setDeliveryLocation(location);
    setDeliveryFee(deliveryOptions[location] || 0);
  };

  const handleProceedToPayment = () => {
    setDeliveryDetails({
      name,
      email,
      phone,
      address,
      location: deliveryLocation,
      fee: deliveryFee,
      product: productDetails
    });
    navigate('/payment', { state: { deliveryDetails: { name, email, phone, address, location: deliveryLocation, fee: deliveryFee }, productDetails } });
  };

  return (
    <div className="px-6 py-24 bg-white isolate sm:py-32 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Delivery Details</h2>
      </div>
      <form className="max-w-xl mx-auto mt-16 sm:mt-20">
        {/* Product Details */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-bold">{productDetails.title || 'Product Title'}</h3>
          <p className="text-gray-700 mb-2">{productDetails.description || 'Product Description'}</p>
          <p className="text-lg font-semibold">Price: KSh {productDetails.price || '0'}</p>
        </div>

        {/* Personal Details */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-bold">Personal Details</h3>
          <div className="mt-4">
            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full mt-2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full mt-2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block w-full mt-2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-900">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full mt-2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Delivery Location */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-bold">Delivery Location</h3>
          <div className="mt-4">
            <label htmlFor="nationality" className="block text-sm font-semibold leading-6 text-gray-900">Nationality</label>
            <select
              id="nationality"
              name="nationality"
              value={nationality}
              onChange={handleNationalityChange}
              className="block w-full mt-2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select your nationality</option>
              {nationalities.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="delivery-location" className="block text-sm font-semibold leading-6 text-gray-900">Delivery Location</label>
            <select
              id="delivery-location"
              name="delivery-location"
              value={deliveryLocation}
              onChange={handleLocationChange}
              className="block w-full mt-2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select a location</option>
              {Object.keys(deliveryOptions).map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleProceedToPayment}
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}
