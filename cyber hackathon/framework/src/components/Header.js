import React, { useState } from "react";
import "./css/Header.css";

const Header = () => {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <header className="top-header">
      <h1 className="title">ModusMapping</h1>
      <button 
        className={`login-btn ${signedIn ? "signed-in" : ""}`} 
        onClick={() => setSignedIn(!signedIn)}
      >
        {signedIn ? "User" : "Login"}
      </button>
    </header>
  );
};

export default Header;
