import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import CrimeRecords from "./pages/CrimeRecords";
import CrimeTrends from "./pages/CrimeTrends";
import CriminalNetwork from "./pages/CriminalNetwork";
import CaseReports from "./pages/CaseReports";
import SearchPage from "./pages/SearchPage";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import SideBar from "./components/SideBar";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`app-container ${sidebarOpen ? "" : "collapsed"}`}>
      <Header />
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="content">
      <div className="bg-image-container">
      <img src="/tn_police_logo.png" alt="Background" className="bg-image" />
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/crime-records" element={<CrimeRecords />} />
          <Route path="/crime-trends" element={<CrimeTrends />} />
          <Route path="/criminal-network" element={<CriminalNetwork />} />
          <Route path="/case-reports" element={<CaseReports />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
