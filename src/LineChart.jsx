import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
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

// Mendaftarkan komponen yang dibutuhkan untuk Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [datas, setDatas] = useState([]);

  // Fetching data dari API
  const fetchDatas = async () => {
    try {
      const response = await fetch("/API/data-kunjungan.JSON"); // Using the proxied path
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDatas(data.data); // Assuming the data structure has a "data" field
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  // Labels untuk bulan (sumbu X)
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const borderColors = [
    "#604CC3",
    "#B8001F",
    "#6439FF",
    "#00CCDD",
    "#F05A7E",
    "#7A1CAC",
  ];

  // Data untuk setiap kategori (sumbu Y)
  const lineChart = {
    labels: labels,
    datasets: datas.map((data) => ({
      label: data.category, // Nama kategori (Umum, Pelajar, dll.)
      data: Object.values(data.months), // Mengambil nilai setiap bulan
      borderColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
      backgroundColor: "#C4D7FF",
      fill: true,
      borderWidth: 3,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Data Kunjungan Per Bulan",
      },
    },
  };

  return (
    <div className="w-3/4 mx-auto">
      <h2 className="text-center text-xl font-bold my-4">
        Line Chart Data Kunjungan
      </h2>
      <Line data={lineChart} options={options} />
    </div>
  );
};

export default LineChart;
