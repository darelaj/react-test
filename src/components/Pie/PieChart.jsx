import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Mendaftarkan komponen yang dibutuhkan untuk Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement // Mendaftarkan ArcElement untuk Pie Chart
);

const PieChart = () => {
  const [datas, setDatas] = useState([]);

  // Fetching data dari API
  const fetchDatas = async () => {
    try {
      const response = await fetch("/API/pendapatan.JSON"); // Using the proxied path
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDatas(data); // Menyimpan data langsung
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  // Data untuk Pie Chart
  const pieData = () => {
    const ticketTotals = {};

    // Menghitung total pembayaran per nama tiket
    datas.forEach((item) => {
      const ticketName = item["Jenis Tiket"];
      const totalPayment = parseFloat(
        item["Total Dibayar"].replace(/\./g, "").replace(",", ".")
      ); // Mengubah string ke number

      if (!ticketTotals[ticketName]) {
        ticketTotals[ticketName] = 0;
      }
      ticketTotals[ticketName] += totalPayment;
    });

    // Mengubah objek menjadi format array untuk Pie Chart
    return {
      labels: Object.keys(ticketTotals), // Mengambil nama tiket sebagai label
      datasets: [
        {
          label: "Total Pembayaran", // Label untuk dataset pie chart
          data: Object.values(ticketTotals), // Data total pembayaran
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#604CC3",
            "#B8001F",
            "#6439FF",
            "#00CCDD",
            "#F05A7E",
            "#7A1CAC",
            "#08C2FF",
            "#FD8B51",
            "#87A2FF",
            "#6256CA"
          ],
        },
      ],
    };
  };

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-center text-xl font-bold my-4">
        Pie Chart Total Pembayaran per Nama Tiket
      </h2>
      <Pie data={pieData()} />
    </div>
  );
};

export default PieChart;
