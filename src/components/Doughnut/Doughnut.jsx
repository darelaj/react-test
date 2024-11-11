import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register necessary elements for the Doughnut Chart
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DoughnutChart = () => {
  const [datas, setDatas] = useState([]);

  // Fetching data from API
  const fetchDatas = async () => {
    try {
      const response = await fetch("/API/pendapatan.JSON");
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

  // Data for Doughnut Chart
  const doughnutData = () => {
    const ticketTotals = {};

    // Calculate total payments per ticket type
    datas.forEach((item) => {
      const paymentTypee = item["Pembayaran"];
      const totalPayment = parseFloat(
        item["Total Dibayar"].replace(/\./g, "").replace(",", ".")
      );

      if (!ticketTotals[paymentTypee]) {
        ticketTotals[paymentTypee] = 0; // Initialize if not present
      }
      ticketTotals[paymentTypee] += totalPayment; // Accumulate total payments
    });

    // Transform the object into arrays for the chart
    return {
      labels: Object.keys(ticketTotals), // Get ticket types as labels
      datasets: [
        {
          label: "Total Pembayaran", // Label for the dataset
          data: Object.values(ticketTotals), // Total payments data
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    };
  };

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-center text-xl font-bold my-4">
        Doughnut Chart Total Pembayaran per Jenis Pembayaran
      </h2>
      <Doughnut data={doughnutData()} />
    </div>
  );
};

export default DoughnutChart;
