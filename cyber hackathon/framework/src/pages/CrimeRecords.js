import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./css/CrimeRecords.css";

const CrimeRecords = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 30;
  const pageCount = Math.ceil(crimeData.length / recordsPerPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Call to Fetch Data
  const fetchCrimeData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8080/crimes/details");
      setCrimeData(response.data);
    } catch (error) {
      console.error("Error fetching crime records:", error);
      setError("Failed to load crime records.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCrimeData();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const currentRecords = crimeData.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage
  );

  return (
    <div className="crime-records-container">
      <h2 className="crime-record-header">Crime Records</h2>

      {loading ? (
        <p className="loading">Loading crime records...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : crimeData.length === 0 ? (
        <p className="no-records">No records found</p>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="crime-table">
              <thead>
                <tr>
                  <th>Crime ID</th>
                  <th>Criminal(s)</th>
                  <th>Crime Type</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Investigator</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((crime, index) => (
                  <tr key={index}>
                    <td>{crime.crimeId || "Unknown"}</td>
                    <td>{crime.criminalNames || "Unknown"}</td>
                    <td>{crime.crimeType || "Unknown"}</td>
                    <td>{crime.crimeLocation || "Unknown"}</td>
                    <td>{new Date(crime.crimeDate).toLocaleDateString() || "Unknown"}</td>
                    <td>{crime.investigator || "Unknown"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </>
      )}
    </div>
  );
};

export default CrimeRecords;
