import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const [datas, setDatas] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("kapasitas-terjual");

  const fetchDatas = async () => {
    try {
      const response = await fetch("/API/kapasitas.JSON");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDatas(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const labels = [
    "TERUSAN",
    "TERUSAN 2",
    "Umum",
    "Pelajar",
    "Mancangera",
    "Makanan",
    "Event",
  ];

  const getRadarData = () => {
    switch (selectedDataset) {
      case "kapasitas-terjual":
        return {
          labels: labels,
          datasets: [
            {
              label: "Terjual",
              data: datas.map((data) => data.terjual),
              borderColor: "#FF9F40",
              backgroundColor: "rgba(255,159,64, 0.5)",
              fill: true,
              borderWidth: 3,
            },
            {
              label: "Kapasitas",
              data: datas.map((data) => data.kapasitas),
              borderColor: "#6439FF",
              backgroundColor: "rgba(100, 57, 255, 0.5)",
              fill: true,
              borderWidth: 3,
            },
          ],
        };
      case "rata-agustus":
        return {
          labels: labels,
          datasets: [
            {
              label: "Rata-rata Kapasitas",
              data: datas.map(
                (data) => parseFloat(data["rata-kapasitas"]) || 0
              ),
              borderColor: "#FF6384",
              backgroundColor: "rgba(255,99,132,0.5)",
              fill: true,
              borderWidth: 3,
            },
            {
              label: "Rata-rata Agustus",
              data: datas.map((data) => {
                const value = parseFloat(data["rata-agustus"].replace("%", ""));
                return isNaN(value) ? 0 : value; // Return 0 if NaN
              }),
              borderColor: "#36A2EB",
              backgroundColor: "rgba(54,162,235,0.5)",
              fill: true,
              borderWidth: 3,
            },
          ],
        };
      case "rata-september":
        return {
          labels: labels,
          datasets: [
            {
              label: "Rata-rata Kapasitas",
              data: datas.map(
                (data) => parseFloat(data["rata-kapasitas"]) || 0
              ),
              borderColor: "#FF6384",
              backgroundColor: "rgba(255,99,132,0.5)",
              fill: true,
              borderWidth: 3,
            },
            {
              label: "Rata-rata September",
              data: datas.map((data) => {
                const value = parseFloat(
                  data["rata-september"].replace("%", "")
                );
                return isNaN(value) ? 0 : value; // Return 0 if NaN
              }),
              borderColor: "#36A2EB",
              backgroundColor: "rgba(54,162,235,0.5)",
              fill: true,
              borderWidth: 3,
            },
          ],
        };
      default:
        return {};
    }
  };

  const radarData = getRadarData();

  return (
    <div className="w-3/4 mx-auto">
      <h2 className="text-center text-xl font-bold my-4 dark:text-white">Radar Chart</h2>
      <div className="text-center my-4">
        <select
          value={selectedDataset}
          onChange={(e) => setSelectedDataset(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="kapasitas-terjual">Kapasitas & Terjual</option>
          <option value="rata-agustus">Rata-Rata Agustus</option>
          <option value="rata-september">Rata-Rata September</option>
        </select>
      </div>
      <Radar data={radarData} />
    </div>
  );
};

export default RadarChart;
