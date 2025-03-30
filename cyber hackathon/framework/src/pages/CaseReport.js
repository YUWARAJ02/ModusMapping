import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/CaseReport.css"; // Custom styling

const CaseReport = () => {
  const { caseId } = useParams(); // Retrieve case ID from URL params
  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cases/${caseId}`);
        setCaseDetails(response.data);
      } catch (err) {
        setError("Failed to fetch case details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  if (loading) return <p className="loading">Loading case details...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="case-report-grid">
      <div className="case-report-container">
        {/* Case Header */}
        <div className="case-header">
          <h2>{caseDetails.title}</h2>
          <span className={`status ${caseDetails.status.toLowerCase()}`}>
            {caseDetails.status}
          </span>
        </div>

        {/* Case Details Grid */}
        <div className="case-details-grid">
          <div className="detail-item"><strong>Case Number:</strong> {caseDetails.caseNumber}</div>
          <div className="detail-item"><strong>Registered By:</strong> {caseDetails.officer.name} (Badge: {caseDetails.officer.badgeNumber})</div>
          <div className="detail-item"><strong>Registered On:</strong> {caseDetails.registeredOn}</div>
          <div className="detail-item"><strong>Status:</strong> {caseDetails.status}</div>
          <div className="detail-item full-width"><strong>Description:</strong> {caseDetails.description}</div>
        </div>

        {/* Crime Details */}
        <h3>Crime Details</h3>
        <div className="crime-section">
          {caseDetails.crimes.map((crime, index) => (
            <div key={index} className="crime-item">
              <p><strong>Type:</strong> {crime.crimeType}</p>
              <p><strong>Date:</strong> {crime.crimeDate}</p>
              <p><strong>Location:</strong> {crime.crimeLocation}</p>
              <p><strong>Description:</strong> {crime.description || "N/A"}</p>
            </div>
          ))}
        </div>

        {/* Criminals */}
        <h3>Criminals Involved</h3>
        <div className="criminals-section">
          {caseDetails.criminals.map((criminal, index) => (
            <div key={index} className="criminal-item">
              <p><strong>Name:</strong> {criminal.name} (Alias: {criminal.alias})</p>
              <p><strong>Date of Birth:</strong> {criminal.dob}</p>
              <p><strong>Phone:</strong> {criminal.phoneNumber}</p>
              <p><strong>Address:</strong> {criminal.address}</p>
              <p><strong>Criminal History:</strong> {criminal.history}</p>
            </div>
          ))}
        </div>

        {/* Evidence */}
        <h3>Evidence</h3>
        <div className="evidence-section">
          {caseDetails.evidence.map((evidence, index) => (
            <div key={index} className="evidence-item">
              <p><strong>Type:</strong> {evidence.evidenceType}</p>
              <p><strong>Description:</strong> {evidence.description}</p>
              <p><strong>Added By:</strong> {evidence.addedBy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseReport;
