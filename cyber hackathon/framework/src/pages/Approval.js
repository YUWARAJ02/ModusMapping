import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Approval.css";

const initialCases = [
  { caseId: "C005", registeredBy: "Officer Alice", registeredOn: "2025-03-22" },
  { caseId: "C006", registeredBy: "Detective Mark", registeredOn: "2025-03-23" },
  { caseId: "C007", registeredBy: "Officer Chris", registeredOn: "2025-03-24" },
];

const Approval = () => {
  const [cases, setCases] = useState(initialCases);
  const [approvalStatus, setApprovalStatus] = useState({});
  const navigate = useNavigate();

  const handleDecision = (caseId, status) => {
    setApprovalStatus((prevStatus) => ({
      ...prevStatus,
      [caseId]: status, // Store approval/rejection status
    }));
  };

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
              <th>View Report</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cases.length > 0 ? (
              cases.map((caseItem) => (
                <tr key={caseItem.caseId}>
                  <td>{caseItem.caseId}</td>
                  <td>{caseItem.registeredBy}</td>
                  <td>{caseItem.registeredOn}</td>
                  <td>
                    <button
                      className="report-btn"
                      onClick={() => navigate(`/case/${caseItem.caseId}`)}
                    >
                      View Report
                    </button>
                  </td>
                  <td>
                    {approvalStatus[caseItem.caseId] ? (
                      <span className={`status ${approvalStatus[caseItem.caseId]}`}>
                        {approvalStatus[caseItem.caseId]}
                      </span>
                    ) : (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() => handleDecision(caseItem.caseId, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleDecision(caseItem.caseId, "Rejected")}
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
                <td colSpan="5" className="no-data">
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
