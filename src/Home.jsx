import React from "react";
import keraton from "./assets/Keraton_kasepuhan.jpg";

const Home = () => {
  return (
    <div>
      <div className="grid justify-items-center py-10">
        <h3 className="text-center font-semibold text-3xl">
          Data Kunjungan Kasepuhan Cirebon - 2024
        </h3>
        <div className="mt-4">
          <img src={keraton} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;