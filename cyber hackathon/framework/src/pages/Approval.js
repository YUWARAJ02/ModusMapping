import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Approval.css";
import Loader from "../components/Loader"; // Ensure path is correct
import Failure from "../components/Failure"; // Ensure path is correct

const Approval = () => {
  const [cases, setCases] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/cases/waiting");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCases(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  const handleDecision = async (caseId, status) => {
    setApprovalStatus((prev) => ({ ...prev, [caseId]: "loading" }));
    try {
      if (status === "Approved") {
        const res = await fetch(`http://localhost:8080/api/cases/${caseId}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "OPEN" }),
        });
        if (!res.ok) throw new Error("Status update failed");
        setApprovalStatus((prev) => ({ ...prev, [caseId]: "Approved" }));
      } else if (status === "Rejected") {
        const res = await fetch(`http://localhost:8080/api/cases/${caseId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Deletion failed");
        setApprovalStatus((prev) => ({ ...prev, [caseId]: "Rejected" }));
        setCases((prevCases) => prevCases.filter((c) => c.id !== caseId));
      }
    } catch (err) {
      console.error(err);
      setApprovalStatus((prev) => ({ ...prev, [caseId]: "failure" }));
    }
  };

  if (loading) return <Loader />;
  if (error) return <Failure message="Could not load cases. Please try again later." />;

  return (
    <div className="approval-container">
      <h2>Newly Registered Cases</h2>

      <div className="approval-table-container">
        <table className="approval-table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Registered By</th>
              <th>Registered On</th>
              <th>Criminals</th>
              <th>View Report</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cases.length > 0 ? (
              cases.map((caseItem) => (
                <tr key={caseItem.id}>
                  <td>{caseItem.caseNumber}</td>
                  <td>{caseItem.officer?.name}</td>
                  <td>{caseItem.registeredOn}</td>
                  <td>{caseItem.criminalNames}</td>
                  <td>
                    <button
                      className="report-btn"
                      onClick={() => navigate(`/case/${caseItem.id}`)}
                    >
                      View Report
                    </button>
                  </td>
                  <td>
                    {approvalStatus[caseItem.id] === "loading" ? (
                      <Loader small />
                    ) : approvalStatus[caseItem.id] === "failure" ? (
                      <Failure message="Failed to update." />
                    ) : approvalStatus[caseItem.id] ? (
                      <span className={`status ${approvalStatus[caseItem.id]}`}>
                        {approvalStatus[caseItem.id]}
                      </span>
                    ) : (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() => handleDecision(caseItem.id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleDecision(caseItem.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No new cases pending approval.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Approval;
