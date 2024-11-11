import React from "react";
import Polar from "./Polar/Polar";
import Radar from "./Radar/Radar";
import RadarChart from "./Radar/Radar";

const PolarRadar = () => {
  return (
    // <div className='flex justify-center  items-center h-screen'>
    //   <h2 className='font-semibold text-2xl'>Coming Soon</h2>
    // </div>
    <div className="grid grid-cols-2">
      <Polar />
      <RadarChart/>
    </div>
  );
};

export default PolarRadar;
