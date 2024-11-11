import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary elements for the Bar Chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartData = () => {
  const [datas, setDatas] = useState([]);

  const fetchDatas = async () => {
    try {
      const response = await fetch("/API/data-kunjungan.JSON");
      const data = await response.json();
      console.log(data); // Check the structure of the fetched data
      setDatas(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  // Months for the X-axis
  const months = [
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

  const colors = [
    "#B7E0FF",
    "#C4D7FF",
    "#3A6D8C",
    "#A594F9",
    "#E5D9F2",
    "#FF6600",
  ];

  // Construct the chart data
  const chartData = {
    labels: months, // X-axis labels
    datasets: datas.map((data, index) => ({
      label: data.category, // Category name for the legend
      data: months.map((month) => data.months[month] || 0), // Extract month data or default to 0
      backgroundColor: colors[index % colors.length], // Color for each category
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
        text: "Data Kunjungan Per Kategori (Bar Chart)",
      },
    },
  };

  return (
    <div className="w-3/4 mx-auto">
      <h2 className="text-center text-xl font-bold my-4 dark:text-white">
        Bar Chart Data Kunjungan
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartData;
