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

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        {success && <p className="success-message">Login successful!</p>}
        {error && <p className="error-message">{error}</p>}
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
