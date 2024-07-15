"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SeriesChart from "../SeriesChart/SeriesChart";

const MarketOverview = () => {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState("1day");
  const [loading, setLoading] = useState(false);

  const fetchData = async (interval) => {
    // let localdata = JSON.parse(localStorage.getItem("chartData"));
    // if (localdata && localdata.length > 0) {
    //   setData(localdata);
    //   return;
    // }
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://twelve-data1.p.rapidapi.com/time_series",
      params: {
        outputsize: "30",
        symbol: "AMZN",
        interval: interval,
        format: "json",
      },
      headers: {
        "x-rapidapi-key": "5d1cafe8ebmsha875c8e06b87807p18b7fajsnfa4fa5622abb",
        "x-rapidapi-host": "twelve-data1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const chartData = response.data.values
        .map((item) => ({
          time: item.datetime,
          value: parseFloat(item.close),
        }))
        .reverse(); // Reverse the data array to be in chronological order
      localStorage.setItem("chartData", JSON.stringify(chartData));
      setData(chartData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(interval);
  }, [interval]);

  return (
    <div className="bg-[#182237] text-white shadow-lg rounded-lg md:p-6  p-3 mt-5 mb-5 w-full">
      <h1 className="text-2xl font-bold mb-4">Market Overview</h1>
      <div className="flex flex-wrap items-center space-x-4 mb-4">
        <button
          onClick={() => setInterval("1week")}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold md:py-2 py-1 md:px-4 px-2 rounded transition duration-300 ${
            interval === "1week" ? "border-2 border-white" : ""
          }`}
        >
          Week
        </button>
        <button
          onClick={() => setInterval("1month")}
          className={`bg-blue-500 hover:bg-blue-700 text-white md:py-2 py-1 md:px-4 px-2  font-bold  rounded transition duration-300 ${
            interval === "1month" ? "border-2 border-white" : ""
          }`}
        >
          Month
        </button>
        <button
          onClick={() => setInterval("1year")}
          className={`bg-blue-500 hover:bg-blue-700 text-white md:py-2 py-1 md:px-4 px-2  font-bold  rounded transition duration-300 ${
            interval === "1year" ? "border-2 border-white" : ""
          }`}
        >
          Year
        </button>
      </div>
      {/* <div className="chart-container w-full h-64"> */}
      <SeriesChart data={data} />
      {/* </div> */}
    </div>
  );
};

export default MarketOverview;
