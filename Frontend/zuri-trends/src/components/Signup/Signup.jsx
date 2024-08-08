<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> refs/remotes/origin/main
// src/components/Signup/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";  // Ensure this CSS file exists
=======
import React, { useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import "./Signup.css";
>>>>>>> 2e5ecdd (login)
=======
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
>>>>>>> 25c4b52 (login)
=======
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
>>>>>>> 5401a78 (fixed login and signup)
=======
// src/components/Signup/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";  // Ensure this CSS file exists
>>>>>>> 8a2a33b (authentication)
=======
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
>>>>>>> 3a46b7e (done with login)
=======
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
>>>>>>> refs/remotes/origin/main
>>>>>>> refs/remotes/origin/main

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> 2e5ecdd (login)
=======
>>>>>>> 25c4b52 (login)
=======
  const navigate = useNavigate();
>>>>>>> 5401a78 (fixed login and signup)
=======
  const navigate = useNavigate();
>>>>>>> 8a2a33b (authentication)

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      const response = await fetch("http://127.0.0.1:5000/user", {
=======
      const response = await fetch("http://127.0.0.1:5000/users", {
>>>>>>> 2e5ecdd (login)
=======
      const response = await fetch("http://127.0.0.1:5000/users", {
>>>>>>> 25c4b52 (login)
=======
      const response = await fetch("http://127.0.0.1:5000/users", {
>>>>>>> 5401a78 (fixed login and signup)
=======
      const response = await fetch("http://127.0.0.1:5000/user", {
>>>>>>> 8a2a33b (authentication)
=======
      const response = await fetch("http://127.0.0.1:5000/users", {
>>>>>>> 3a46b7e (done with login)
=======
      const response = await fetch("http://127.0.0.1:5000/user", {
=======
      const response = await fetch("http://127.0.0.1:5000/users", {
>>>>>>> refs/remotes/origin/main
>>>>>>> refs/remotes/origin/main
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8a2a33b (authentication)
=======
>>>>>>> refs/remotes/origin/main
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong!");
        return;
<<<<<<< HEAD
      }

      const data = await response.json();
      setSuccess(true);
      console.log("User created:", data);
      
      // Navigate to the homepage upon successful sign-up
      navigate("/home");

    } catch (err) {
      setError("Network error. Please try again later.");
=======
=======
>>>>>>> 25c4b52 (login)
=======
>>>>>>> 5401a78 (fixed login and signup)
      const data = await response.json();
=======
      const data = await response.json();
>>>>>>> 3a46b7e (done with login)

      if (response.ok) {
        setSuccess(true);
        console.log("User created:", data);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      } else {
        setError(data.message || "Something went wrong!");
=======
>>>>>>> 8a2a33b (authentication)
      }

      const data = await response.json();
      setSuccess(true);
      console.log("User created:", data);
      
      // Navigate to the homepage upon successful sign-up
      navigate("/home");

    } catch (err) {
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 2e5ecdd (login)
=======
>>>>>>> 25c4b52 (login)
=======
      setError("Network error. Please try again later.");
>>>>>>> 8a2a33b (authentication)
      console.error("Error:", err);
=======
<<<<<<< HEAD
        navigate("/login"); 
=======
        navigate("/");
>>>>>>> 3a46b7e (done with login)
=======
        navigate("/"); 
>>>>>>> 4937bec (done with login)
=======
      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        console.log("User created:", data);
        navigate("/"); 
>>>>>>> refs/remotes/origin/main
      } else {
        setError(data.error || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to sign up");
<<<<<<< HEAD
>>>>>>> 5401a78 (fixed login and signup)
=======
>>>>>>> refs/remotes/origin/main
>>>>>>> refs/remotes/origin/main
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <a href="/login">Already have an account? Log in</a>
=======
          <Link to="/login">Already have an account? Log in</Link>
>>>>>>> 2e5ecdd (login)
=======
          <Link to="/login">Already have an account? Log in</Link>
>>>>>>> 25c4b52 (login)
=======
          <Link to="/login">Already have an account? Log in</Link>
>>>>>>> 5401a78 (fixed login and signup)
=======
          <a href="/login">Already have an account? Log in</a>
>>>>>>> 8a2a33b (authentication)
=======
          <Link to="/">Already have an account? Log in</Link>
>>>>>>> 3a46b7e (done with login)
=======
          <a href="/login">Already have an account? Log in</a>
=======
          <Link to="/">Already have an account? Log in</Link>
>>>>>>> refs/remotes/origin/main
>>>>>>> refs/remotes/origin/main
        </div>
      </form>
    </div>
  );
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export default Signup;
=======
export default Signup;
>>>>>>> 2e5ecdd (login)
=======
>>>>>>> 7994107 (change)
=======
export default Signup;
>>>>>>> 25c4b52 (login)
=======
>>>>>>> 6fb504f (redoing login and signup)
=======
export default Signup;
>>>>>>> 5401a78 (fixed login and signup)
=======
export default Signup;
>>>>>>> 8a2a33b (authentication)
=======
export default Signup;
>>>>>>> 4937bec (done with login)
=======
export default Signup;
=======
export default Signup;
>>>>>>> refs/remotes/origin/main
>>>>>>> refs/remotes/origin/main
