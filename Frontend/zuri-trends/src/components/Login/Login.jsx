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
=======
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // Simple validation to check if email and password fields are filled
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
>>>>>>> refs/remotes/origin/main

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
<<<<<<< HEAD
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
      console.error("Error:", err);
=======
        body: JSON.stringify({ email, password }), // Sending email and password in the request body
      });

      const data = await response.json(); // Parsing the response data
      console.log("Response data:", data); // Log the entire response data for debugging

      if (!response.ok) {
        // Check for specific status codes and set error messages accordingly
        if (response.status === 401) {
          throw new Error("Invalid email or password!");
        } else if (response.status === 400) {
          throw new Error(data.error || "Bad Request: Check your input.");
        } else {
          throw new Error("Something went wrong!");
        }
      }

      // If the request is successful, set success to true and display a success message
      setSuccess(true);
      toast.success(`${data.name || "User"} successfully logged in!`);
      console.log("User logged in:", data);
      navigate("/home"); // Redirect to the home page on successful login
    } catch (err) {
      // Handle errors by setting the error message and logging the error
      setError(err.message);
      console.error("Error:", err);
      toast.error(err.message);
>>>>>>> refs/remotes/origin/main
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Log In</h2>
        {success && <p className="text-green-500 mb-4">Logged in successfully!</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
=======
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        {success && <p className="success-message">Login successful!</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
>>>>>>> refs/remotes/origin/main
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
<<<<<<< HEAD
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
=======
          />
        </div>
        <div className="input-group">
>>>>>>> refs/remotes/origin/main
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
=======
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
>>>>>>> refs/remotes/origin/main

export default Login;
