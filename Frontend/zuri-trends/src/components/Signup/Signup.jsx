// src/components/Signup/Signup.jsx
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
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
      
      // Navigate to the homepage upon successful sign-up
      navigate("/home");


      if (response.ok) {
        setSuccess(true);
        console.log("User created:", data);
        navigate("/login"); 
      } else {
        setError(data.error || "Something went wrong!");
      }

    } catch (err) {
      setError("Network error. Please try again later.");
      console.error("Error:", err);
      setError("Failed to sign up");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>SIGN UP</h2>
        {success && (
          <p className="success-message">User created successfully!</p>
        )}
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
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">SIGN UP</button>
        <div className="extra-links">
          <a href="/login">Already have an account? Log in</a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
