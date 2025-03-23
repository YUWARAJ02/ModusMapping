import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/CaseReports.css";

const caseData = [
  { caseId: "C001", registeredOn: "2025-03-20", registeredBy: "Officer John Doe", status: "Open", summary: "Burglary at 5th Street", criminalName: "Jake Williams" },
  { caseId: "C002", registeredOn: "2025-03-18", registeredBy: "Detective Jane Smith", status: "Closed", summary: "Fraud investigation concluded", criminalName: "Sophia Lee" },
  { caseId: "C003", registeredOn: "2025-03-21", registeredBy: "Officer Robert Brown", status: "In Progress", summary: "Investigation on stolen vehicle", criminalName: "Michael Davis" },
  { caseId: "C004", registeredOn: "2025-03-22", registeredBy: "Officer David Lee", status: "Open", summary: "Cyber fraud case initiated", criminalName: "Emma Johnson" },
  { caseId: "C005", registeredOn: "2025-03-19", registeredBy: "Detective Angela White", status: "Closed", summary: "Arson case investigation", criminalName: "Ryan Garcia" },
  { caseId: "C006", registeredOn: "2025-03-17", registeredBy: "Officer Steve Rogers", status: "Open", summary: "Homicide at Riverside Park", criminalName: "Liam Carter" },
  { caseId: "C007", registeredOn: "2025-03-15", registeredBy: "Detective Diana Prince", status: "Under Investigation", summary: "Bank robbery suspect identified", criminalName: "Olivia Martinez" },
  { caseId: "C008", registeredOn: "2025-03-23", registeredBy: "Officer Bruce Wayne", status: "Open", summary: "Drug trafficking operation disrupted", criminalName: "Ethan Thompson" },
  { caseId: "C009", registeredOn: "2025-03-20", registeredBy: "Detective Clark Kent", status: "Closed", summary: "Hit-and-run accident solved", criminalName: "Isabella Walker" },
];


const ITEMS_PER_PAGE = 30;

const CaseReports = () => {
  const [caseIdFilter, setCaseIdFilter] = useState("");
  const [criminalNameFilter, setCriminalNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Filter cases by Case ID or Criminal Name
  const filteredCases = caseData.filter(
    (caseItem) =>
      caseItem.caseId.toLowerCase().includes(caseIdFilter.toLowerCase()) &&
      caseItem.criminalName.toLowerCase().includes(criminalNameFilter.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredCases.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCases = filteredCases.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="page-container">
      <h2>Case Reports</h2>
{/* Register Case Button */}


      {/* Filters */}
      <div className="filter-container">
        <input
          type="text"
          className="filter-input"
          placeholder="Filter by Case ID..."
          value={caseIdFilter}
          onChange={(e) => setCaseIdFilter(e.target.value)}
        />
        <input
          type="text"
          className="filter-input"
          placeholder="Filter by Criminal Name..."
          value={criminalNameFilter}
          onChange={(e) => setCriminalNameFilter(e.target.value)}
        />
  <button className="register-case-btn" onClick={() => navigate("/case-registration")}>
    Register New Case
  </button>

      </div>

      {/* Case Table */}
      <div className="case-table-container">
        <table className="case-table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Registered On</th>
              <th>Registered By</th>
              <th>Status</th>
              <th>Summary</th>
              <th>Criminal Name</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCases.length > 0 ? (
              paginatedCases.map((caseItem) => (
                <tr key={caseItem.caseId}>
                  <td>{caseItem.caseId}</td>
                  <td>{caseItem.registeredOn}</td>
                  <td>{caseItem.registeredBy}</td>
                  <td>{caseItem.status}</td>
                  <td>{caseItem.summary}</td>
                  <td>{caseItem.criminalName}</td>
                  <td>
                    <button
                      className="report-btn"
                      onClick={() => navigate(`/case/${caseItem.caseId}`)}
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No matching cases found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CaseReports;
