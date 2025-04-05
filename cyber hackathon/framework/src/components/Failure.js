import React from "react";
import "./css/Failure.css";

const Failure = ({ onRetry }) => {
  return (
    <div className="ghibli-failure">
      <div className="face-container">
        <div className="face">
          <div className="eye left"></div>
          <div className="eye right"></div>
          <div className="mouth"></div>
        </div>
        <div className="tear"></div>
      </div>
      <h2 className="oops-title">Oops... Something went wrong</h2>
      <p className="oops-message">
        The winds didn't bring the data home this time.
      </p>
      <p className="oops-inspire">
        “Even strong hearts stumble—just like brave officers in battle. Try again?”
      </p>
      <button className="oops-retry" onClick={onRetry}>Retry with Courage</button>
    </div>
  );
};

export default Failure;
