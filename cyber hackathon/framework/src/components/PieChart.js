import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "./css/PieChart.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("2024-01-20");
  const [endDate, setEndDate] = useState("2024-03-20");
  const [selectedChart, setSelectedChart] = useState("crimeType");

  // Function to fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `http://localhost:8080/dashboard/pieChartData?fromDate=${startDate}&toDate=${endDate}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
        
      }

      const data = await response.json();
      setChartData(data);
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever startDate or endDate changes
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  // Function to generate chart data
  const generateChartData = () => {
    if (!chartData) return null;

    let labels = [];
    let data = [];
    let backgroundColors = [];

    const processCounts = (key) => {
      return chartData.reduce((acc, crime) => {
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
      const officerCounts = processCounts("officerName");
      labels = Object.keys(officerCounts);
      data = Object.values(officerCounts);
      backgroundColors = ["#6A0572", "#FF4500", "#008080", "#FF69B4", "#607D8B"];
    }

    if (selectedChart === "criminalAnalysis") {
      const criminalCounts = processCounts("criminalName");
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

      {/* Loader while fetching data */}
      {loading && <div className="loader">Loading data...</div>}

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Show chart only when data is available */}
      {!loading && !error && chartData && (
        <div className="chart-wrapper">
          <Pie data={generateChartData()} />
        </div>
      )}
    </div>
  );
};

export default PieChart;
