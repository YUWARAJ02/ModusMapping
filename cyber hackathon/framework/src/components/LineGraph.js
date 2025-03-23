import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./css/LineGraph.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = () => {
  const [startDate, setStartDate] = useState("2024-01-20");
  const [endDate, setEndDate] = useState("2024-03-20");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  // Function to fetch data from API with timeout and retry logic
  const fetchCrimeData = async (retry = 0) => {
    setLoading(true);
    setError(null);

    try {
      const source = axios.CancelToken.source();
      const timeout = setTimeout(() => source.cancel("Request timed out"), 5000);

      const response = await axios.get("http://localhost:8080/dashboard/lineChartData", {
        params: { fromDate: startDate, toDate: endDate },
        cancelToken: source.token,
      });

      clearTimeout(timeout);
      setRetryCount(0); // Reset retries on success

      const crimeData = response.data;

      // Extract unique locations
      const locations = [...new Set(crimeData.map((item) => item.location))];

      // Group crime data by location
      const datasets = locations.map((location, index) => {
        const locationData = crimeData.filter((item) => item.location === location);
        const sortedData = locationData.sort((a, b) => new Date(a.date) - new Date(b.date));

        return {
          label: location,
          data: sortedData.map((item) => item.count),
          borderColor: `hsl(${index * 60}, 70%, 50%)`,
          backgroundColor: `hsl(${index * 60}, 70%, 80%)`,
          fill: false,
        };
      });

      // Extract unique dates in sorted order
      const dateLabels = [...new Set(crimeData.map((item) => item.date.split(" ")[0]))].sort();

      setChartData({ labels: dateLabels, datasets: datasets });

    } catch (error) {
      if (axios.isCancel(error)) {
        setError("Request timed out. Retrying...");
      } else {
        setError("Failed to fetch data. Retrying...");
      }

      if (retry < MAX_RETRIES) {
        setTimeout(() => fetchCrimeData(retry + 1), 3000); // Retry after 3 seconds
        setRetryCount(retry + 1);
      } else {
        setError("Failed to fetch data after multiple attempts.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle date input changes
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  useEffect(() => {
    fetchCrimeData();
  }, [startDate, endDate]);

  return (
    <div className="line-graph-container">
      <h2 className="line-graph-header">Crime Trends Over Time</h2>

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
        <button onClick={() => fetchCrimeData()}>Apply Filter</button>
      </div>

      {/* Show loading state */}
      {loading && <p>Loading data... (Retry: {retryCount}/{MAX_RETRIES})</p>}

      {/* Show error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Line Chart */}
      <div className="chart-wrapper">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "top" } },
            scales: {
              x: { title: { display: true, text: "Date" } },
              y: { title: { display: true, text: "Crime Count" } },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LineGraph;
