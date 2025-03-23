import React, { useState } from "react";
import "./css/CaseRegistration.css";

const CaseRegistration = () => {
  const [formData, setFormData] = useState({
    caseNumber: "",
    title: "",
    description: "",
    status: "open",
    officerId: "",
    crimeType: "",
    crimeDate: "",
    location: "",
    criminals: "",
    aiSummary: "",
  });

  // Handles input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    // TODO: Call API to save case to database
    // fetch("/api/cases", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // }).then(response => response.json()).then(data => console.log(data));
  };

  // Handles AI Summary Generation
  const generateAISummary = () => {
    console.log("Generating AI Summary for:", formData);

    // TODO: Call AI API to generate summary
    // fetch("/api/ai/generate-summary", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ description: formData.description, crimeType: formData.crimeType }),
    // })
    //   .then(response => response.json())
    //   .then(data => setFormData({ ...formData, aiSummary: data.summary }));
    
    setFormData({
      ...formData,
      aiSummary: "Based on historical patterns, this crime might be related to past burglary cases in the area. Possible suspects: John Doe, Mike Ross.",
    });
  };

  return (
    <div className="case-registration-container">
      <h2>Register a New Case</h2>
      <form onSubmit={handleSubmit}>
        {/* Case Details */}
        <label>Case Number:</label>
        <input type="text" name="caseNumber" value={formData.caseNumber} onChange={handleChange} required />

        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        {/* Officer Assignment */}
        <label>Assign Officer:</label>
        <select name="officerId" value={formData.officerId} onChange={handleChange} required>
          <option value="">Select Officer</option>
          <option value="1">John Doe</option>
          <option value="2">Jane Smith</option>
          {/* TODO: Fetch officers dynamically */}
        </select>

        {/* Crime Details */}
        <label>Crime Type:</label>
        <input type="text" name="crimeType" value={formData.crimeType} onChange={handleChange} required />

        <label>Crime Date:</label>
        <input type="date" name="crimeDate" value={formData.crimeDate} onChange={handleChange} required />

        <label>Crime Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <label>Suspected Criminals (Comma Separated):</label>
        <input type="text" name="criminals" value={formData.criminals} onChange={handleChange} />

        {/* AI Summary Button */}
        <button type="button" className="ai-summary-btn" onClick={generateAISummary}>
          Generate AI Summary
        </button>

        {/* Display AI Summary */}
        {formData.aiSummary && (
          <div className="ai-summary-box">
            <h3>AI Generated Summary:</h3>
            <p>{formData.aiSummary}</p>
          </div>
        )}

        <button type="submit" className="submit-btn">Register Case</button>
      </form>
    </div>
  );
};

export default CaseRegistration;
