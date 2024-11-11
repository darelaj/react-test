import React, { useState, useEffect } from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import * as XLSX from "xlsx"; // Import the xlsx library

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const Polar = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDatas = async () => {
    try {
      const response = await fetch("/API/pendapatan.JSON");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDatas(data);
    } catch (error) {
      setError("Failed to fetch data, please try again later.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const polarData = () => {
    const ticketTotals = {};

    datas.forEach((item) => {
      const ticketName = item["Jenis Tiket"];
      const totalPayment = parseFloat(
        item["Total Dibayar"].replace(/\./g, "").replace(",", ".")
      );

      if (!ticketTotals[ticketName]) {
        ticketTotals[ticketName] = 0;
      }
      ticketTotals[ticketName] += totalPayment;
    });

    return {
      labels: Object.keys(ticketTotals),
      datasets: [
        {
          label: "Total Pembayaran",
          data: Object.values(ticketTotals),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#604CC3",
          ],
        },
      ],
    };
  };

  // Function to export data as XLSX
  const exportXLSX = () => {
    try {
      // Convert the data into a format that can be used by XLSX
      const ws = XLSX.utils.json_to_sheet(datas);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Pendapatan");

      // Write the workbook to a file and trigger download
      XLSX.writeFile(wb, "data.xlsx");
    } catch (error) {
      console.error("Error exporting to XLSX:", error);
    }
  };

  return (
    <div className="w-3/4 mx-auto">
      <h2 className="text-center text-xl font-bold my-4">Polar Chart</h2>
      <>
        <PolarArea data={polarData()} />
        <button
          onClick={exportXLSX}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Export to XLSX
        </button>
      </>
    </div>
  );
};

export default Polar;
