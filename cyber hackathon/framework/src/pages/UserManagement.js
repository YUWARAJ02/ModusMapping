import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "./css/UserManagement.css"; // Import styles

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Store users from API
  const [loading, setLoading] = useState(true); // Show loader until data is fetched
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Users per page

  // Fetch users from API using Axios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Hide loader after fetching
      }
    };

    fetchUsers();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Get users for the current page
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className="usermanagement-container">
      <h2>Registered Officers</h2>

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : (
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.roleName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">No users registered</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {users.length > usersPerPage && (
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
