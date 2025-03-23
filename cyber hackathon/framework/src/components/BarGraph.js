import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Select from "react-select";
import axios from "axios"; // Uncommented API call
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./css/BarGraph.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [startDate, setStartDate] = useState("2024-01-20");
  const [endDate, setEndDate] = useState("2024-03-20");
  const [selectedCrimeTypes, setSelectedCrimeTypes] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);
  const [timeoutError, setTimeoutError] = useState(false);

  const crimeColors = {
    "Robbery": "rgba(255, 99, 132, 0.8)",
    "Kidnapping": "rgba(54, 162, 235, 0.8)",
    "Cyber Crime": "rgba(255, 206, 86, 0.8)",
  };

  const fetchCrimeData = async () => {
    setLoading(true);
    setTimeoutError(false);

    const apiUrl = `http://localhost:8080/dashboard/barGraphData?fromDate=${startDate}&toDate=${endDate}`;
    const source = axios.CancelToken.source();

    // Set timeout of 20 seconds
    const timeout = setTimeout(() => {
      source.cancel();
      setLoading(false);
      setTimeoutError(true);
    }, 60000);

    try {
      const response = await axios.get(apiUrl, { cancelToken: source.token });
      clearTimeout(timeout);
      setCrimeData(response.data);

      const uniqueCrimeTypes = [...new Set(response.data.map((item) => item.location))];
      setSelectedCrimeTypes(uniqueCrimeTypes);
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error("API request timed out.");
      } else {
        console.error("Error fetching crime data:", error);
      }
      setLoading(false);
    }
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
    const filteredData = crimeData.filter(
      (item) =>
        item.date >= startDate &&
        item.date <= endDate &&
        selectedCrimeTypes.includes(item.location)
    );

    const dates = [...new Set(filteredData.map((item) => item.date.split(" ")[0]))];
    const crimeTypes = [...new Set(filteredData.map((item) => item.location))];

    const datasets = crimeTypes.map((type) => ({
      label: type,
      backgroundColor: crimeColors[type] || "rgba(153, 102, 255, 0.8)",
      data: dates.map((date) => {
        const crimesOnDate = filteredData.filter((item) => item.date.startsWith(date) && item.location === type);
        return crimesOnDate.reduce((sum, crime) => sum + crime.count, 0);
      }),
    }));

    setChartData({
      labels: dates,
      datasets: datasets,
    });
  };

  useEffect(() => {
    fetchCrimeData();
  }, [startDate, endDate]);

  useEffect(() => {
    filterData();
  }, [crimeData, selectedCrimeTypes]);

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
            options={crimeData.length > 0 ? [...new Set(crimeData.map((item) => ({ value: item.location, label: item.location })))] : []}
            isMulti
            defaultValue={crimeData.length > 0 ? [...new Set(crimeData.map((item) => ({ value: item.location, label: item.location })))] : []}
            onChange={handleCrimeTypeChange}
            className="crime-select"
          />
        </div>

        <button onClick={fetchCrimeData}>Apply Filter</button>
      </div>

      {/* Loading Indicator */}
      {loading && <div className="loading-spinner">Loading data...</div>}

      {/* Timeout Message */}
      {timeoutError && <div className="error-message">Request timed out. Please try again.</div>}

      {/* Bar Chart */}
      {!loading && !timeoutError && (
        <div className="chart-wrapper">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
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
      )}
    </div>
  );
};

export default BarGraph;
