import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2"; // Import Bar chart
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register necessary elements for the Bar Chart
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const BarChart = () => {
  const [datas, setDatas] = useState([]); // Initialize as empty array

  // Fetching data from API
  const fetchDatas = async () => {
    try {
      const response = await fetch("/API/pendapatan.JSON"); // Using the proxied path
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDatas(data); // Store the data directly
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  // Data for Bar Chart
  const barData = () => {
    const ticketTotals = {};

    // Calculate total payments per ticket name
    datas.forEach((item) => {
      const ticketName = item["Jenis Tiket"];
      const totalPayment = parseFloat(
        item["Total Dibayar"].replace(/\./g, "").replace(",", ".")
      ); // Convert string to number

      if (!ticketTotals[ticketName]) {
        ticketTotals[ticketName] = 0; // Initialize if not present
      }
      ticketTotals[ticketName] += totalPayment; // Accumulate total payments
    });

    // Transform the object into arrays for the chart
    return {
      labels: Object.keys(ticketTotals), // Get ticket names as labels
      datasets: [
        {
          label: "Total Pembayaran", // Label for the dataset
          data: Object.values(ticketTotals), // Total payments data
          backgroundColor: [
            "#4BC0C0",
          ],
        },
      ],
    };
  };

  const options = {
    responsive: true,
    indexAxis: "y", // ini yang membuat y-axis menjadi x
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Jenis Tiket",
      },
    },
  };

  return (
    <div className="w-3/4 mx-auto">
      <h2 className="text-center text-xl font-bold my-4 dark:text-white">
        Bar Chart Data Pembayaran
      </h2>
      <Bar data={barData()} options={options} />
    </div>
  );
};

export default BarChart;
