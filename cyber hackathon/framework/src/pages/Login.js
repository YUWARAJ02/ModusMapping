import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials for now (replace with API call later)
    const validUsername = "admin";
    const validPassword = "password123";

    if (username === validUsername && password === validPassword) {
      setIsLoggedIn(true);
      navigate("/"); // Redirect to Dashboard after login
    } else {
      setError("Invalid username or password");
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
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
