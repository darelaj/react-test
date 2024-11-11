import React, { useState, useEffect } from "react";

const TabelData = () => {
  const [datas, setDatas] = useState([]);

  const fetchDatas = async () => {
    try {
      const response = await fetch("/API/data-kunjungan.JSON"); // Using the proxied path
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      const data = await response.json();
      setDatas(data.data); // Assuming the data structure has a "data" field
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Memanggil fetchDatas ketika komponen dimuat
  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl pb-5 pt-5">
        Tabel Kunjungan Kasepuhan 2024
      </h2>

      <div className="flex justify-center">
        <table className="table-auto">
          <thead className="bg-purple-400 text-white">
            <tr className="border-2 border-gray-200">
              <th className="border-2 border-gray-200 px-2 py-1">Category</th>
              <th className="border-2 border-gray-200 px-2 py-1">Januari</th>
              <th className="border-2 border-gray-200 px-2 py-1">Februari</th>
              <th className="border-2 border-gray-200 px-2 py-1">Maret</th>
              <th className="border-2 border-gray-200 px-2 py-1">April</th>
              <th className="border-2 border-gray-200 px-2 py-1">May</th>
              <th className="border-2 border-gray-200 px-2 py-1">Juni</th>
              <th className="border-2 border-gray-200 px-2 py-1">Juli</th>
              <th className="border-2 border-gray-200 px-2 py-1">Agustus</th>
              <th className="border-2 border-gray-200 px-2 py-1">September</th>
              <th className="border-2 border-gray-200 px-2 py-1">Oktober</th>
              <th className="border-2 border-gray-200 px-2 py-1">November</th>
              <th className="border-2 border-gray-200 px-2 py-1">Desember</th>
              <th className="border-2 border-gray-200 px-2 py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {datas.length > 0 ? (
              datas.map((data, index) => (
                <tr key={index} className="border-2 border-gray-200 px-2 py-1">
                  <td className="border-2 border-gray-200 px-2 py-1">
                    {data.category}
                  </td>
                  <td className="border-2 border-gray-200 px-2 py-1 text-center">
                    {data.months.Jan}
                  </td>
                  <td className="border-2 border-gray-200 px-2  text-center">
                    {data.months.Feb}
                  </td>
                  <td className="border-2 border-gray-200 px-2  text-center">
                    {data.months.Mar}
                  </td>
                  <td className="border-2 border-gray-200 px-2  text-center">
                    {data.months.Apr}
                  </td>
                  <td className="border-2 border-gray-200 px-2  text-center">
                    {data.months.May}
                  </td>
                  <td className="border-2 border-gray-200 px-2  text-center">
                    {data.months.Jun}
                  </td>
                  <td className="border-2 border-gray-200 px-2  text-center">
                    {data.months.Jul}
                  </td>
                  <td className="border-2 border-gray-200 px-2  text-center">
                    {data.months.Aug}
                  </td>
                  <td className="border-2 border-gray-200 px-2  text-center">
                    {data.months.Sep}
                  </td>
                  <td className="border-2 border-gray-200 px-2  text-center">
                    {data.months.Oct}
                  </td>
                  <td className="border-2 border-gray-200 px-2  text-center">
                    {data.months.Nov}
                  </td>
                  <td className="border-2 border-gray-200 px-2  text-center">
                    {data.months.Dec}
                  </td>
                  <td className="border-2 border-gray-200 px-2  text-center">
                    {data.total}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="border-2 border-gray-200">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelData;
