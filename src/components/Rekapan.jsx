import React from "react";
import ChartData from "../ChartData";
import LineChart from "../LineChart";
import TabelData from "../TabelData";

const Rekapan = () => {
  return (
    <div>
      <TabelData />
      <div className="grid grid-cols-2 pt-5">
        <ChartData />
        <LineChart />
      </div>
    </div>
  );
};

export default Rekapan;
