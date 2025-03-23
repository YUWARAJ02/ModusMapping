import React from 'react';
import "./css/AboutUs.css";

function AboutUs() {
  return (
    <div className="about-container">
      <h2 className="about-title">About ModusMapping</h2>
      <p className="about-description">
        ModusMapping is an AI-driven crime analysis platform designed for the <b>Thoothukudi Police Department</b>. 
        This system enhances law enforcement efficiency by leveraging advanced data analytics, crime pattern recognition, and predictive intelligence.
      </p>

      <div className="about-features">
        <div className="feature">
          <h3>AI-Powered Crime Analysis</h3>
          <p>Utilizes machine learning to detect crime patterns and provide actionable insights.</p>
        </div>
        <div className="feature">
          <h3>Interactive Dashboards</h3>
          <p>Offers role-based dashboards with real-time updates and visual crime heatmaps.</p>
        </div>
        <div className="feature">
          <h3>Neo4j Relationship Mapping</h3>
          <p>Detects connections between criminals, suspects, and cases for better investigation strategies.</p>
        </div>
        <div className="feature">
          <h3>Secure & Scalable</h3>
          <p>Ensures data security with access controls and scalable cloud-based deployment.</p>
        </div>
      </div>

      <div className="about-contact">
        <h3>Contact Us</h3>
        <p><b>Phone:</b> <a href="tel:+9163805244000">63805244000</a></p>
        <p><b>Email:</b> <a href="mailto:priya23@gmail.com">priya23@gmail.com</a></p>
        <p><b>Address:</b> Pazhayakayal, Thoothukudi</p>
      </div>
    </div>
  );
}

export default AboutUs;
