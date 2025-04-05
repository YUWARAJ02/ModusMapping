import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/CaseReports.css";
import Loader from "../components/Loader";
import Failure from "../components/Failure"; // ✅ Import the Failure component

const ITEMS_PER_PAGE = 30;

const CaseReports = () => {
  const [caseData, setCaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ Error state
  const [caseIdFilter, setCaseIdFilter] = useState("");
  const [criminalNameFilter, setCriminalNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");

  const fetchCaseData = () => {
    setLoading(true);
    setError(null);
    axios.get("http://localhost:8080/api/cases")
      .then((response) => {
        setCaseData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cases:", error);
        setError("Failed to load case reports.");
        setLoading(false);
      });
  };

  // Fetch case data on load
  useEffect(() => {
    fetchCaseData();
  }, []);

  // Filter logic
  const filteredCases = caseData.filter(
    (caseItem) =>
      caseItem.caseNumber.toLowerCase().includes(caseIdFilter.toLowerCase()) &&
      caseItem.criminalNames.toLowerCase().includes(criminalNameFilter.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCases.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCases = filteredCases.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="page-container">
      <h2>Case Reports</h2>

      {/* Loading */}
      {loading && <Loader />}

      {/* Error Handling */}
      {!loading && error && <Failure onRetry={fetchCaseData} />} {/* ✅ */}

      {/* Filters + Table */}
      {!loading && !error && (
        <>
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
            {(role === "ADMIN" || role === "EDITOR") && (
  <button className="register-case-btn" onClick={() => navigate("/case-registration")}>
    Register New Case
  </button>
)}

          </div>

          <div className="case-table-container">
            <table className="case-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Registered On</th>
                  <th>Criminal Names</th>
                  <th>Status</th>
                  <th>Summary</th>
                  <th>Officer Name</th>
                  <th>Report</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCases.length > 0 ? (
                  paginatedCases.map((caseItem) => (
                    <tr key={caseItem.id}>
                      <td>{caseItem.caseNumber}</td>
                      <td>{caseItem.registeredOn}</td>
                      <td>{caseItem.criminalNames || "Unknown"}</td>
                      <td>{caseItem.status}</td>
                      <td>{caseItem.description}</td>
                      <td>{caseItem.officer.name}</td>
                      <td>
                        <button
                          className="report-btn"
                          onClick={() => navigate(`/case/${caseItem.id}`)}
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
        </>
      )}
    </div>
  );
};

export default CaseReports;
