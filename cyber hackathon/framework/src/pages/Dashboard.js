import React from "react";
import "./css/Dashboard.css";
import LineGraph from "../components/LineGraph";
import BarGraph from "../components/BarGraph";

const Dashboard = () => {
  return (
    <main className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="dashboard-grid">
        <section className="grid-item line-chart"><LineGraph/></section>
        <section className="grid-item pie-chart">pie-chart</section>
        <section className="grid-item bar-chart"><BarGraph/></section>
      </div>
    </main>
  );
};

export default Dashboard;
