import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Select from "react-select"; // Import react-select for dropdown
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./css/BarGraph.css"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = () => {
  const dummyData = [
    { date: "2024-03-01", location: "Location 1", crimeType: "Theft", count: 5 },
    { date: "2024-03-01", location: "Location 2", crimeType: "Murder", count: 3 },
    { date: "2024-03-02", location: "Location 3", crimeType: "Assault", count: 7 },
    { date: "2024-03-02", location: "Location 4", crimeType: "Fraud", count: 4 },
    { date: "2024-03-03", location: "Location 5", crimeType: "Theft", count: 6 },
    { date: "2024-03-03", location: "Location 6", crimeType: "Murder", count: 2 },
    { date: "2024-03-04", location: "Location 7", crimeType: "Assault", count: 5 },
    { date: "2024-03-04", location: "Location 1", crimeType: "Fraud", count: 8 },
  ];

  const [startDate, setStartDate] = useState("2024-03-01");
  const [endDate, setEndDate] = useState("2024-03-06");
  const allCrimeTypes = [...new Set(dummyData.map((item) => item.crimeType))]; // Extract unique crime types
  const [selectedCrimeTypes, setSelectedCrimeTypes] = useState(allCrimeTypes);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const crimeColors = {
    Theft: "rgba(255, 99, 132, 0.8)",
    Murder: "rgba(54, 162, 235, 0.8)",
    Assault: "rgba(255, 206, 86, 0.8)",
    Fraud: "rgba(75, 192, 192, 0.8)",
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  const handleCrimeTypeChange = (selectedOptions) => {
    setSelectedCrimeTypes(selectedOptions.map((option) => option.value));
  };

  const filterData = () => {
    const filteredData = dummyData.filter(
      (item) =>
        item.date >= startDate &&
        item.date <= endDate &&
        selectedCrimeTypes.includes(item.crimeType)
    );

    const dates = [...new Set(filteredData.map((item) => item.date))];
    const crimeTypes = [...new Set(filteredData.map((item) => item.crimeType))];

    const datasets = crimeTypes.map((type) => ({
      label: type,
      backgroundColor: crimeColors[type] || "rgba(153, 102, 255, 0.8)",
      data: dates.map((date) => {
        const crimesOnDate = filteredData.filter((item) => item.date === date && item.crimeType === type);
        return crimesOnDate.reduce((sum, crime) => sum + crime.count, 0);
      }),
    }));

    setChartData({
      labels: dates,
      datasets: datasets,
    });
  };

  useEffect(() => {
    filterData();
  }, [startDate, endDate, selectedCrimeTypes]);

  return (
    <div className="bar-graph-container">
      <h2 className="bargraph-title">Crime Counts by Type & Date</h2>

      {/* Filters */}
      <div className="filter-container">
        {/* Date Filter */}
        <div className="date-filter">
          <label>
            Start Date:
            <input type="date" name="startDate" value={startDate} onChange={handleDateChange} />
          </label>
          <label>
            End Date:
            <input type="date" name="endDate" value={endDate} onChange={handleDateChange} />
          </label>
        </div>

        {/* Crime Type Filter - Multi-Select Dropdown */}
        <div className="crime-type-filter">
          <span>Filter by Crime Type:</span>
          <Select
            options={allCrimeTypes.map((type) => ({ value: type, label: type }))}
            isMulti
            defaultValue={allCrimeTypes.map((type) => ({ value: type, label: type }))}
            onChange={handleCrimeTypeChange}
            className="crime-select"
          />
        </div>

        <button onClick={filterData}>Apply Filter</button>
      </div>

      {/* Bar Chart */}
      <div className="chart-wrapper">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false, // Prevents overflow
            scales: {
              x: { title: { display: true, text: "Date" } },
              y: { title: { display: true, text: "Total Crime Count" } },
            },
            plugins: {
              legend: { position: "top" },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarGraph;
