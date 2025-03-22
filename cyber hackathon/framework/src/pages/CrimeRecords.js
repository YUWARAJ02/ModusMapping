import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./css/CrimeRecords.css";

const dummyData = Array.from({ length: 100 }, (_, i) => ({
  crimeId: i + 1,
  criminal: `Criminal ${i + 1}`,
  crimeType: ["Theft", "Murder", "Assault", "Fraud"][i % 4],
  location: `Location ${i + 1}`,
  date: `2024-03-${(i % 30) + 1}`,
  investigator: `Investigator ${i + 1}`,
  status: ["Open", "Closed", "Under Investigation"][(i % 3)],
}));

const CrimeRecords = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 30;
  const pageCount = Math.ceil(dummyData.length / recordsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const currentRecords = dummyData.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage
  );

  return (
    <div className="crime-records-container">
      <h2 className="crime-record-header">Crime Records</h2>
      {dummyData.length === 0 ? (
        <p className="no-records">No records found</p>
      ) : (
        <>
        <div className="table-wrapper">
          <table className="crime-table">
            <thead>
              <tr>
                <th>Crime ID</th>
                <th>Criminal</th>
                <th>Crime Type</th>
                <th>Location</th>
                <th>Date</th>
                <th>Investigator</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((crime, index) => (
                <tr key={index}>
                  <td>{crime.crimeId || "Unknown"}</td>
                  <td>{crime.criminal || "Unknown"}</td>
                  <td>{crime.crimeType || "Unknown"}</td>
                  <td>{crime.location || "Unknown"}</td>
                  <td>{crime.date || "Unknown"}</td>
                  <td>{crime.investigator || "Unknown"}</td>
                  <td>{crime.status || "Unknown"}</td>
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
