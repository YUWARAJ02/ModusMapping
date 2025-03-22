import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./css/LineGraph.css"

// Register required components from Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = () => {
  // Dummy data for crimes across 7 different locations
  const dummyData = [
    { date: '2024-03-01', location: 'Location 1', crimeCount: 5 },
    { date: '2024-03-02', location: 'Location 2', crimeCount: 8 },
    { date: '2024-03-03', location: 'Location 3', crimeCount: 3 },
    { date: '2024-03-04', location: 'Location 4', crimeCount: 6 },
    { date: '2024-03-05', location: 'Location 5', crimeCount: 2 },
    { date: '2024-03-06', location: 'Location 6', crimeCount: 4 },
    { date: '2024-03-07', location: 'Location 7', crimeCount: 7 },
    { date: '2024-03-02', location: 'Location 1', crimeCount: 7 },
    { date: '2024-03-03', location: 'Location 2', crimeCount: 2 },
    { date: '2024-03-04', location: 'Location 3', crimeCount: 9 },
    { date: '2024-03-05', location: 'Location 4', crimeCount: 5 },
    { date: '2024-03-06', location: 'Location 5', crimeCount: 3 },
    { date: '2024-03-07', location: 'Location 6', crimeCount: 8 },
    { date: '2024-03-08', location: 'Location 7', crimeCount: 5 },
    { date: '2024-03-09', location: 'Location 1', crimeCount: 9 },
    { date: '2024-03-10', location: 'Location 2', crimeCount: 4 },
    { date: '2024-03-11', location: 'Location 3', crimeCount: 7 },
    { date: '2024-03-12', location: 'Location 4', crimeCount: 6 },
    { date: '2024-03-13', location: 'Location 5', crimeCount: 4 },
    { date: '2024-03-14', location: 'Location 6', crimeCount: 2 },
    { date: '2024-03-15', location: 'Location 7', crimeCount: 6 },
    { date: '2024-03-16', location: 'Location 1', crimeCount: 5 },
    { date: '2024-03-17', location: 'Location 2', crimeCount: 8 },
    { date: '2024-03-18', location: 'Location 3', crimeCount: 3 },
    { date: '2024-03-19', location: 'Location 4', crimeCount: 7 },
    { date: '2024-03-20', location: 'Location 5', crimeCount: 2 },
    { date: '2024-03-21', location: 'Location 6', crimeCount: 4 },
    { date: '2024-03-22', location: 'Location 7', crimeCount: 9 },
  ];

  const [startDate, setStartDate] = useState('2024-03-01');
  const [endDate, setEndDate] = useState('2024-03-22');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Crimes by Location",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  const filterDataByDate = () => {
    const filteredData = dummyData.filter((item) => item.date >= startDate && item.date <= endDate);

    const locations = [...new Set(filteredData.map((item) => item.location))];
    const crimesByLocation = locations.map((location) => {
      return filteredData
        .filter((item) => item.location === location)
        .reduce((acc, curr) => acc + curr.crimeCount, 0);
    });

    setChartData({
      labels: locations,
      datasets: [
        {
          label: "Crimes by Location",
          data: crimesByLocation,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    });
  };

  useEffect(() => {
    filterDataByDate();
  }, [startDate, endDate]);

  return (
    <div className="line-graph-container">
      <h2 className="line-graph-header">Crimes by Location and Date</h2>

      {/* Date Range Filter */}
      <div className="date-filter">
        <label>
          Start Date:
          <input type="date" name="startDate" value={startDate} onChange={handleDateChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="endDate" value={endDate} onChange={handleDateChange} />
        </label>
        <button onClick={filterDataByDate}>Apply Filter</button>
      </div>

      {/* Line Chart */}
      <div className="chart-wrapper">
        <Line
          data={chartData}
          options={{
            responsive: true, // Make the graph responsive
            maintainAspectRatio: false, // Allow it to resize with its container
          }}
        />
      </div>
    </div>
  );
};

export default LineGraph;
