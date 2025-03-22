import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Header.css";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="top-header">
      <h1 className="title">ModusMapping</h1>
      <button className={`logout-btn ${isLoggedIn ? "signed-in" : ""}`} onClick={handleAuthClick}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </header>
  );
};

export default Header;
