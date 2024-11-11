import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="drop-shadow-md bg-white dark:bg-gray-800">
      <ul className="flex gap-8 justify-center py-5">
        <li className="text-md font-semibold text-purple-400 dark:text-purple-200">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="text-md font-semibold text-purple-400 dark:text-purple-200">
          <NavLink to="/rekapan">Rekapan Transaksi</NavLink>
        </li>
        <li className="text-md font-semibold text-purple-400 dark:text-purple-200">
          <NavLink to="/pendapatan">Data Pendapatan</NavLink>
        </li>
        <li className="text-md font-semibold text-purple-400 dark:text-purple-200">
          <NavLink to="/polar/radar">Polar & Radar</NavLink>
        </li>
        <button
          onClick={toggleDarkMode}
          className="text-md font-semibold text-purple-400 dark:text-purple-200"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
