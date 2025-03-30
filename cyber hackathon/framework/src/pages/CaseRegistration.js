import React, { useState, useEffect } from "react";
import "./css/CaseRegistration.css";

const CaseRegistration = () => {
  const [formData, setFormData] = useState({
    caseNumber: "",
    title: "",
    description: "",
    status: "OPEN",
    officerId: "",
    crimeType: "",
    crimeDate: "",
    location: "",
    criminals: "",
    aiSummary: "",
  });

  const [officers, setOfficers] = useState([]); // Store officers list
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch officers when component mounts
  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((response) => response.json())
      .then((data) => setOfficers(data))
      .catch((error) => console.error("Error fetching officers:", error));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      caseNumber: formData.caseNumber,
      title: formData.title,
      description: formData.description,
      status: formData.status.toUpperCase(), // ✅ Ensure ENUM compatibility
      officerId: parseInt(formData.officerId), // ✅ Send officerId directly

      crimes: [
        {
          crimeType: formData.crimeType,
          crimeDate: new Date(formData.crimeDate).toISOString(), // ✅ Convert to ISO Date format
          location: formData.location,
          criminals: formData.criminals
            ? formData.criminals.split(",").map((c) => ({ name: c.trim() }))
            : [],
        },
      ],
    };

    console.log("Submitting Case:", requestBody);

    fetch("http://localhost:8080/api/cases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        setLoading(false);
        if (!response.ok) throw new Error("Failed to register case");
        return response.json();
      })
      .then((data) => {
        alert("✅ Case registered successfully!");
        console.log("Response:", data);
        setFormData({
          caseNumber: "",
          title: "",
          description: "",
          status: "OPEN",
          officerId: "",
          crimeType: "",
          crimeDate: "",
          location: "",
          criminals: "",
          aiSummary: "",
        });
      })
      .catch((error) => {
        setLoading(false);
        alert("❌ Failed to register case. Check console for details.");
        console.error("Error:", error);
      });
  };

  // AI Summary Generation (Mock Implementation)
  const generateAISummary = () => {
    console.log("Generating AI Summary for:", formData);
    setFormData({
      ...formData,
      aiSummary:
        "Based on historical patterns, this crime might be related to past cases in the area. Possible suspects: John Doe, Mike Ross.",
    });
  };

  return (
    <div className="case-registration-container">
      <h2>Register a New Case</h2>
      <form onSubmit={handleSubmit}>
        {/* Case Details */}
        <label>Case Number:</label>
        <input
          type="text"
          name="caseNumber"
          value={formData.caseNumber}
          onChange={handleChange}
          required
        />

        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="OPEN">Open</option>
          <option value="CLOSED">Closed</option>
        </select>

        {/* Officer Assignment */}
        <label>Assign Officer:</label>
        <select
          name="officerId"
          value={formData.officerId}
          onChange={handleChange}
          required
        >
          <option value="">Select Officer</option>
          {officers.map((officer) => (
            <option key={officer.id} value={officer.id}>
              {officer.name}
            </option>
          ))}
        </select>

        {/* Crime Details */}
        <label>Crime Type:</label>
        <input
          type="text"
          name="crimeType"
          value={formData.crimeType}
          onChange={handleChange}
          required
        />

        <label>Crime Date:</label>
        <input
          type="date"
          name="crimeDate"
          value={formData.crimeDate}
          onChange={handleChange}
          required
        />

        <label>Crime Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Suspected Criminals (Comma Separated):</label>
        <input
          type="text"
          name="criminals"
          value={formData.criminals}
          onChange={handleChange}
        />

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

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Registering..." : "Register Case"}
        </button>
      </form>
    </div>
  );
};

export default CaseRegistration;
