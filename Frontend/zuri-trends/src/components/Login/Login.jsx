
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css";


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

      const response = await fetch(
        `http://127.0.0.1:5000/users?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}&name=${encodeURIComponent(
          name
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid name, email, or password!");
        } else {
          throw new Error("Something went wrong!");
        }
      }

      const data = await response.json();


      setSuccess(true);
      toast.success(`${name} successfully logged in!`);
      console.log("User logged in:", data);

      navigate("/"); // Redirect to the home page on successful login

    } catch (err) {
      setError("Network error. Please try again later.");
      console.error("Error:", err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Log In</h2>
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

        </div>
        <button type="submit">LOGIN</button>
        <div className="extra-links">
          <a href="#">Forgot your password?</a>
          <Link to="/signup">Create an account</Link>
        </div>
      </form>

    </div>
  );
};

export default Login;
