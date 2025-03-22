import React, { useState } from "react";
import "./css/UserManagement.css"; // Import styles

// Sample user data (Replace with API data when integrating with backend)
const initialUsers = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `12345${i + 1000}`,
  role: i % 3 === 0 ? "admin" : i % 3 === 1 ? "editor" : "viewer",
}));

const UserManagement = () => {
  const [users] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Users per page

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Get users for current page
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className="usermanagement-container">
      <h2>Registered Officers</h2>

      {/* User List Table */}
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
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
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
        {users.length > 30 && (
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
    </div>
  );
};

export default UserManagement;
