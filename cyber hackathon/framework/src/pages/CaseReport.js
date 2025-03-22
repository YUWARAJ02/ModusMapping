import React from "react";
import { useParams } from "react-router-dom";
import "./css/CaseReport.css"; // Custom styling

const mockCaseData = {
  caseId: "C001",
  caseNumber: "CASE-20250320",
  title: "Burglary at 5th Street",
  description: "Investigation of a burglary reported at 5th Street.",
  status: "Open",
  registeredOn: "2025-03-20",
  registeredBy: "Officer John Doe",
  badgeNumber: "JD12345",
  year: 2025,
  month: 3,
  crimes: [
    {
      crimeType: "Burglary",
      crimeDate: "2025-03-19",
      location: "5th Street, NY",
      description: "House was broken into, valuables stolen."
    }
  ],
  criminals: [
    {
      name: "Jake Williams",
      alias: "JW",
      dob: "1990-05-10",
      phoneNumber: "555-1234",
      address: "123 Fake St, NY",
      history: "Multiple burglary offenses."
    }
  ],
  evidence: [
    {
      evidenceType: "CCTV Footage",
      description: "Surveillance footage of the suspect.",
      addedBy: "Officer Jane Smith"
    }
  ]
};

const CaseReport = () => {
  const { caseId } = useParams(); // Retrieve case ID from URL params
  const caseDetails = mockCaseData; // Replace with API fetch in future

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
          <div className="detail-item"><strong>Registered By:</strong> {caseDetails.registeredBy} (Badge: {caseDetails.badgeNumber})</div>
          <div className="detail-item"><strong>Registered On:</strong> {caseDetails.registeredOn}</div>
          <div className="detail-item"><strong>Status:</strong> {caseDetails.status}</div>
          <div className="detail-item"><strong>Year:</strong> {caseDetails.year}</div>
          <div className="detail-item"><strong>Month:</strong> {caseDetails.month}</div>
          <div className="detail-item full-width"><strong>Description:</strong> {caseDetails.description}</div>
        </div>

        {/* Crime Details */}
        <h3>Crime Details</h3>
        <div className="crime-section">
          {caseDetails.crimes.map((crime, index) => (
            <div key={index} className="crime-item">
              <p><strong>Type:</strong> {crime.crimeType}</p>
              <p><strong>Date:</strong> {crime.crimeDate}</p>
              <p><strong>Location:</strong> {crime.location}</p>
              <p><strong>Description:</strong> {crime.description}</p>
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
