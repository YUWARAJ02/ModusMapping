import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "./css/PieChart.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const dummyData = [
    { date: "2024-03-01", crimeType: "Theft", officer: "Officer A", criminal: "Criminal X" },
    { date: "2024-03-02", crimeType: "Murder", officer: "Officer B", criminal: "Criminal Y" },
    { date: "2024-03-03", crimeType: "Assault", officer: "Officer A", criminal: "Criminal X" },
    { date: "2024-03-04", crimeType: "Fraud", officer: "Officer C", criminal: "Criminal Z" },
    { date: "2024-03-05", crimeType: "Theft", officer: "Officer B", criminal: "Criminal Y" },
    { date: "2024-03-06", crimeType: "Murder", officer: "Officer D", criminal: "Criminal X" },
    { date: "2024-03-07", crimeType: "Theft", officer: "Officer C", criminal: "Criminal Z" },
  ];

  const [startDate, setStartDate] = useState("2024-03-01");
  const [endDate, setEndDate] = useState("2024-03-07");
  const [selectedChart, setSelectedChart] = useState("crimeType");

  const filterDataByDate = () => {
    return dummyData.filter((item) => item.date >= startDate && item.date <= endDate);
  };

  const generateChartData = () => {
    const filteredData = filterDataByDate();
    let labels = [];
    let data = [];
    let backgroundColors = [];

    const processCounts = (key) => {
      return filteredData.reduce((acc, crime) => {
        acc[crime[key]] = (acc[crime[key]] || 0) + 1;
        return acc;
      }, {});
    };

    if (selectedChart === "crimeType") {
      const crimeCounts = processCounts("crimeType");
      labels = Object.keys(crimeCounts);
      data = Object.values(crimeCounts);
      backgroundColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"];
    }

    if (selectedChart === "officerCases") {
      const officerCounts = processCounts("officer");
      labels = Object.keys(officerCounts);
      data = Object.values(officerCounts);
      backgroundColors = ["#6A0572", "#FF4500", "#008080", "#FF69B4", "#607D8B"];
    }

    if (selectedChart === "criminalAnalysis") {
      const criminalCounts = processCounts("criminal");
      labels = Object.keys(criminalCounts);
      data = Object.values(criminalCounts);
      backgroundColors = ["#1E90FF", "#D2691E", "#A52A2A", "#8A2BE2", "#DC143C"];
    }

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors.map((color) => color + "AA"),
        },
      ],
    };
  };

  return (
    <div className="pie-chart-container">
      <h2 className="pie-chart-header">Crime Data Analysis</h2>

      <div className="date-filter">
        <label>
          Chart Type:
          <select value={selectedChart} onChange={(e) => setSelectedChart(e.target.value)}>
            <option value="crimeType">Crime Distribution by Type</option>
            <option value="officerCases">Crime Distribution by Officer</option>
            <option value="criminalAnalysis">Criminal Involvement Analysis</option>
          </select>
        </label>

        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>

        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
      </div>

      <div className="chart-wrapper">
        <Pie data={generateChartData()} />
      </div>
    </div>
  );
};

export default PieChart;
