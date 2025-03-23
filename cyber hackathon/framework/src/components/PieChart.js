import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "./css/PieChart.css"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // Dummy crime data
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
  const [selectedChart, setSelectedChart] = useState("crimeType"); // Default to Crime Distribution

  // Function to filter data by date
  const filterDataByDate = () => {
    return dummyData.filter((item) => item.date >= startDate && item.date <= endDate);
  };

  const generateChartData = () => {
    const filteredData = filterDataByDate();

    let labels = [];
    let data = [];
    let backgroundColors = [];

    const generateTopN = (countMap, topN = 10) => {
      let sortedEntries = Object.entries(countMap).sort((a, b) => b[1] - a[1]);
      let topEntries = sortedEntries.slice(0, topN);
      let othersSum = sortedEntries.slice(topN).reduce((sum, entry) => sum + entry[1], 0);

      let topLabels = topEntries.map(entry => entry[0]);
      let topData = topEntries.map(entry => entry[1]);

      if (othersSum > 0) {
        topLabels.push("Others");
        topData.push(othersSum);
      }

      return { labels: topLabels, data: topData };
    };

    if (selectedChart === "crimeType") {
      const crimeCounts = filteredData.reduce((acc, crime) => {
        acc[crime.crimeType] = (acc[crime.crimeType] || 0) + 1;
        return acc;
      }, {});

      let { labels: topLabels, data: topData } = generateTopN(crimeCounts, 10);
      labels = topLabels;
      data = topData;
      backgroundColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0", "#E91E63", "#FFC107", "#3F51B5", "#009688", "#795548"];
    }

    if (selectedChart === "officerCases") {
      const officerCounts = filteredData.reduce((acc, crime) => {
        acc[crime.officer] = (acc[crime.officer] || 0) + 1;
        return acc;
      }, {});

      let { labels: topLabels, data: topData } = generateTopN(officerCounts, 10);
      labels = topLabels;
      data = topData;
      backgroundColors = ["#6A0572", "#FF4500", "#008080", "#FF69B4", "#607D8B", "#8BC34A", "#F44336", "#03A9F4", "#FFEB3B", "#CDDC39"];
    }

    if (selectedChart === "criminalAnalysis") {
      const criminalCounts = filteredData.reduce((acc, crime) => {
        acc[crime.criminal] = (acc[crime.criminal] || 0) + 1;
        return acc;
      }, {});

      let { labels: topLabels, data: topData } = generateTopN(criminalCounts, 10);
      labels = topLabels;
      data = topData;
      backgroundColors = ["#1E90FF", "#D2691E", "#A52A2A", "#8A2BE2", "#DC143C", "#20B2AA", "#FF8C00", "#00CED1", "#8B0000", "#2E8B57"];
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

      {/* Chart Type Selector */}
      <label>Select Chart Type:</label>
      <select value={selectedChart} onChange={(e) => setSelectedChart(e.target.value)}>
        <option value="crimeType">Crime Distribution by Type</option>
        <option value="officerCases">Crime Distribution by Officer</option>
        <option value="criminalAnalysis">Criminal Involvement Analysis</option>
      </select>

      {/* Date Range Filter */}
      <div className="date-filter">
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
      </div>

      {/* Pie Chart */}
      <Pie data={generateChartData()} />
    </div>
  );
};

export default PieChart;
