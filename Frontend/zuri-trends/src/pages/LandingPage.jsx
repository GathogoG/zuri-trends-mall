import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Slideshow = () => {
  const images = [
    'https://i.pinimg.com/736x/34/b5/bb/34b5bb91e76e7b71b6f9831c57a3c9c9.jpg',
    'https://i.pinimg.com/736x/47/31/56/473156de67a244546bbc9dfe31fb1dc4.jpg',
    'https://i.pinimg.com/736x/98/da/10/98da10176b78d506eac7df037dfdbd5d.jpg',
    'https://i.pinimg.com/736x/0c/49/a5/0c49a51fd6fe84331b06a97252bac489.jpg',
    'https://i.pinimg.com/736x/01/d7/da/01d7dab14710e89725c7353e34e1292c.jpg',
    'https://i.pinimg.com/736x/a6/75/5f/a6755f64de303ff1a57531bed7a5a9ba.jpg',
    'https://i.pinimg.com/736x/a2/b7/5f/a2b75f8ad5330c81d686158003d88f7f.jpg',
    'https://i.pinimg.com/564x/04/4c/d0/044cd0afef330055cae3c526ba54c62a.jpg',
    'https://i.pinimg.com/564x/e5/6b/32/e56b3298921274f6ce899932a0d623f1.jpg',
    'https://i.pinimg.com/564x/eb/95/96/eb9596069adb41c3baad3b9144965ae2.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden perspective-1000">
      <div className="cube">
        {images.map((image, index) => (
          <div
            key={index}
            className={`face face-${index}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      <button
        onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-lg"
      >
        &lt;
      </button>
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-lg"
      >
        &gt;
      </button>
    </div>
  );
};

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
    <div className="relative min-h-screen">
      <Slideshow /> {/* Include the Slideshow component */}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to ZURI TRENDS</h1>
            <p className="text-lg text-gray-600">Your one-stop shop for the latest fashion trends!</p>
          </div>

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
    </div>
  );
};

export default LandingPage;
