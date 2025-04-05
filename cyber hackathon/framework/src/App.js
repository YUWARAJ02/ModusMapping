import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CrimeRecords from "./pages/CrimeRecords";
import CrimeTrends from "./pages/CrimeTrends";
import CriminalNetwork from "./pages/CriminalNetwork";
import CaseReports from "./pages/CaseReports";
import CaseReport from "./pages/CaseReport";
import SearchPage from "./pages/SearchPage";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import SideBar from "./components/SideBar";
import Approval from "./pages/Approval";
import "./App.css";
import Chatbot from "./pages/ChatBot";
import CaseRegistration from "./pages/CaseRegistration";
import AboutUs from "./pages/AboutUs";

function App() {
  // Get login status & role from session storage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  });

  const [role, setRole] = useState(() => {
    return sessionStorage.getItem("role") || "";
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Login handler (from Login page)
  const handleLogin = () => {
    sessionStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setRole(sessionStorage.getItem("role"));
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setRole("");
  };

  // Role checks
  const isAdmin = role === "ADMIN";
  const isEditor = role === "EDITOR";
  const isAdminOrEditor = isAdmin || isEditor;

  return (
    <div className={isLoggedIn ? `app-container ${sidebarOpen ? "" : "collapsed"}` : "login-container"}>
      {isLoggedIn && <Header isLoggedIn={isLoggedIn} setIsLoggedIn={handleLogout} />}

      {!isLoggedIn ? (
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="content">
            <div className="bg-image-container">
              <img src="/tn_police_logo.png" alt="Background" className="bg-image" />
            </div>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/crime-records" element={<CrimeRecords />} />
              <Route path="/chat-bot" element={<Chatbot />} />
              <Route path="/criminal-network" element={<CriminalNetwork />} />
              <Route path="/case-reports" element={<CaseReports />} />
              <Route path="/case/:caseId" element={<CaseReport />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/settings" element={<Settings />} />
              {/* Conditional Routes based on role */}
              {isAdminOrEditor && <Route path="/case-registration" element={<CaseRegistration />} />}
              {isAdmin && <Route path="/approval" element={<Approval />} />}
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
