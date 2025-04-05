import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");         // renamed to email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.userId && data.role) {
        // Store in sessionStorage
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("role", data.role);

        alert(data.message || "Login successful!");
        setIsLoggedIn(true);
        navigate("/"); // Redirect to Dashboard
      } else {
        setError(data.message || "Invalid credentials");
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong");
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
