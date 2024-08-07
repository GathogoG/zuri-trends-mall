<<<<<<< HEAD
// src/components/Signup/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";  // Ensure this CSS file exists
=======
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
>>>>>>> 2e5ecdd (login)

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> 2e5ecdd (login)

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
      const response = await fetch("http://127.0.0.1:5000/user", {
=======
      const response = await fetch("http://127.0.0.1:5000/users", {
>>>>>>> 2e5ecdd (login)
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

<<<<<<< HEAD
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

    } catch (err) {
      setError("Network error. Please try again later.");
=======
      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        console.log("User created:", data);
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
>>>>>>> 2e5ecdd (login)
      console.error("Error:", err);
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
          <a href="/login">Already have an account? Log in</a>
=======
          <Link to="/login">Already have an account? Log in</Link>
>>>>>>> 2e5ecdd (login)
        </div>
      </form>
    </div>
  );
}

<<<<<<< HEAD
export default Signup;
=======
export default Signup;
>>>>>>> 2e5ecdd (login)
