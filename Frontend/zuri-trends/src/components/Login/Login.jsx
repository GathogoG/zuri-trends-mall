<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

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
        setError(errorData.error || "Login failed!");
        return;
      }

      const data = await response.json();
      setSuccess(true);
      console.log("User logged in:", data);
      navigate("/home"); // Redirect to home upon successful login

    } catch (err) {
      setError("Network error. Please try again later.");
=======
=======
>>>>>>> 25c4b52 (login)
import React, { useState } from "react";
import { Link } from "react-router-dom";
=======
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
>>>>>>> 5401a78 (fixed login and signup)
=======
import toast from "react-hot-toast";
>>>>>>> d6540ae (added toaat message)
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> 5401a78 (fixed login and signup)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch(
<<<<<<< HEAD
<<<<<<< HEAD
        `http://127.0.0.1:5000/users`,
=======
        `http://127.0.0.1:5000/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&name=${encodeURIComponent(name)}`,
>>>>>>> 5401a78 (fixed login and signup)
=======
        `http://127.0.0.1:5000/users?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}&name=${encodeURIComponent(
          name
        )}`,
>>>>>>> d6540ae (added toaat message)
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
<<<<<<< HEAD
        throw new Error("Something went wrong!");
=======
        throw new Error("Invalid name, email, or password!");
>>>>>>> 5401a78 (fixed login and signup)
      }

      const data = await response.json();
      if (data.length === 0) {
        throw new Error("Invalid name, email, or password!");
      }

      setSuccess(true);
      toast.success(`${name} successfully logged in!`);
      console.log("User logged in:", data);
<<<<<<< HEAD
    } catch (err) {
      setError(err.message);
<<<<<<< HEAD
>>>>>>> 2e5ecdd (login)
=======
>>>>>>> 25c4b52 (login)
      console.error("Error:", err);
    }
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Log In</h2>
        {success && <p className="text-green-500 mb-4">Logged in successfully!</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
=======
=======
>>>>>>> 25c4b52 (login)
=======
      navigate("/"); // Redirect to the home page on successful login
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
>>>>>>> 5401a78 (fixed login and signup)
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        {success && <p className="success-message">Login successful!</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 2e5ecdd (login)
=======
>>>>>>> 25c4b52 (login)
=======
>>>>>>> 5401a78 (fixed login and signup)
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
=======
          />
        </div>
        <div className="input-group">
>>>>>>> 2e5ecdd (login)
=======
          />
        </div>
        <div className="input-group">
>>>>>>> 25c4b52 (login)
=======
          />
        </div>
        <div className="input-group">
>>>>>>> 5401a78 (fixed login and signup)
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
=======
=======
>>>>>>> 25c4b52 (login)
=======
>>>>>>> 5401a78 (fixed login and signup)
          />
        </div>
        <button type="submit">LOGIN</button>
        <div className="extra-links">
          <a href="#">Forgot your password?</a>
          <Link to="/signup">Create an account</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 2e5ecdd (login)
=======
>>>>>>> 7994107 (change)
=======
>>>>>>> 25c4b52 (login)
=======
>>>>>>> 6fb504f (redoing login and signup)
=======
>>>>>>> 5401a78 (fixed login and signup)
