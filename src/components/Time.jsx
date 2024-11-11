import React, { useEffect, useState } from "react";

const Time = () => {
  const [timeOnly, setTimeOnly] = useState("");

  const fetchDatas = async () => {
    try {
      const response = await fetch("/API/new-data-kunjungan.JSON");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Misalnya mengambil item pertama dari data untuk contoh ini
      const datetime = data[1].Tanggal;

      if (datetime) {
        const extractedTime = datetime.split(" ")[1]; // Mengambil hanya bagian jam
        setTimeOnly(extractedTime);
      }

      // Simpan data lainnya sesuai kebutuhan
      // setDatas(data);
      setDatas(data); // Store the data directly
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <div>
      <p>Jam: {timeOnly}</p>
    </div>
  );
};

export default Time;
