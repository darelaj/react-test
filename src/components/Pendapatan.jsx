import React from "react";
import PieChart from "./Pie/PieChart";
import LinePen from "./Line/Line";
import DoughnutChart from "./Doughnut/Doughnut";
import BarChart from "./Bar/BarChart";

const Pendapatan = () => {
  return (
    <div className="grid grid-cols-2 pt-5">
      <PieChart />
      <LinePen />
      <DoughnutChart />
      <BarChart />
    </div>
  );
};

export default Pendapatan;
