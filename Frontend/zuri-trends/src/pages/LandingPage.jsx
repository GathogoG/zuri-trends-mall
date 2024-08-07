import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [showSignUp, setShowSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const userData = {
      email,
      password,
      name,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong!");
        return;
      }

      const data = await response.json();
      setSuccess(true);
      console.log("User created:", data);
      navigate("/home"); // Redirect to home upon successful sign-up

    } catch (err) {
      setError("Network error. Please try again later.");
      console.error("Error:", err);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed!");
        return;
      }

      const data = await response.json();
      setSuccess(true);
      console.log("User logged in:", data);
      navigate("/home"); // Redirect to home upon successful login

    } catch (err) {
      setError("Network error. Please try again later.");
      console.error("Error:", err);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{ backgroundImage: `url('https://img.freepik.com/premium-psd/flat-design-business-web-template_23-2150023011.jpg`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="text-center mb-8 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to ZURI TRENDS</h1>
        <p className="text-lg text-gray-600">Your one-stop shop for the latest fashion trends!</p>
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        {showSignUp ? (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sign Up</h2>
            {success && <p className="text-green-500 mb-4">User created successfully!</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSignUp} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4">
              Already have an account?{' '}
              <button
                onClick={() => setShowSignUp(false)}
                className="text-blue-600 hover:underline"
              >
                Log In
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Log In</h2>
            {success && <p className="text-green-500 mb-4">Logged in successfully!</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Log In
              </button>
            </form>
            <p className="mt-4">
              Don't have an account?{' '}
              <button
                onClick={() => setShowSignUp(true)}
                className="text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
