import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2"; // Import Line chart
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement, // Use LineElement instead of BarElement
  CategoryScale,
  LinearScale,
  PointElement, // Add PointElement for line chart
} from "chart.js";

// Register necessary elements for the Line Chart
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const LinePen = () => {
  const [datas, setDatas] = useState([]); // Initialize as empty array

  // Fetching data from API
  const fetchDatas = async () => {
    try {
      const response = await fetch("/API/pendapatan.JSON");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();

      // Sorting data berdasarkan tanggal dari yang paling lama ke yang terbaru
      data = data.sort(
        (a, b) => new Date(a["Tanggal"]) - new Date(b["Tanggal"])
      );

      setDatas(data); // Store the data after sorting
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  // Data for Line Chart
  const lineData = () => {
    const ticketTotals = {};

    // Calculate total payments per ticket type (Jenis Tiket)
    datas.forEach((item) => {
      const ticketDate = item["Tanggal"];
      const totalPayment = parseFloat(
        item["Total Dibayar"].replace(/\./g, "").replace(",", ".")
      ); // Convert string to number

      if (!ticketTotals[ticketDate]) {
        ticketTotals[ticketDate] = 0; // Initialize if not present
      }
      ticketTotals[ticketDate] += totalPayment; // Accumulate total payments
    });

    // Transform the object into arrays for the chart
    return {
      labels: Object.keys(ticketTotals), // Get ticket types as labels
      datasets: [
        {
          label: "Total Pembayaran", // Label for the dataset
          data: Object.values(ticketTotals), // Total payments data
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
          tension: 0.2, // Smooth curve
          pointBackgroundColor: "#36A2EB",
          pointBorderColor: "#fff",
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Jenis Tiket",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-3/4 mx-auto">
      <h2 className="text-center text-xl font-bold my-4">
        Line Chart Data Pembayaran
      </h2>
      <Line data={lineData()} options={options} />
    </div>
  );
};

export default LinePen;
