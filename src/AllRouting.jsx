import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Pendapatan from "./components/Pendapatan";
import Rekapan from "./components/Rekapan";
import PolarRadar from "./components/PolarRadar";

const AllRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rekapan" element={<Rekapan />} />
      <Route path="/pendapatan" element={<Pendapatan />} />
      <Route path="/polar/radar" element={<PolarRadar />} />
    </Routes>
  );
};

export default AllRouting;
