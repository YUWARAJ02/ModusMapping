import { useState } from "react";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={isLoggedIn ? `app-container ${sidebarOpen ? "" : "collapsed"}` : "login-container"}>
      {isLoggedIn && <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}

      {!isLoggedIn ? (
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
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
              <Route path="/approval" element={<Approval />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/case-registration" element={<CaseRegistration />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
