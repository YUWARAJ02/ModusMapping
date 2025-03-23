import React from "react";
import "./css/Dashboard.css";
import LineGraph from "../components/LineGraph";
import BarGraph from "../components/BarGraph";
import PieChart from "../components/PieChart";

const Dashboard = () => {
  return (
    <>
    <h2 className="dashboard-title">Dashboard</h2>
    <main className="dashboard-container">
      <div className="dashboard-grid">
        <section className="grid-item line-chart"><LineGraph /></section>
        <section className="grid-item pie-chart"><PieChart /></section>
        <section className="grid-item bar-chart"><BarGraph /></section>
      </div>
    </main>
    </>
  );
};

export default Dashboard;
