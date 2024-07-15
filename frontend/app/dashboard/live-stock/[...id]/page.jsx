// pages/stocks/[symbol].jsx
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartComponent from "@/app/ui/dashboard/CandleChart/CandleChart";
import SeriesChart from "@/app/ui/dashboard/SeriesChart/SeriesChart";
import CompanyStockDetails from "@/app/ui/dashboard/stockDetails/stockDetails";
import dayjs from "dayjs";
import Link from "next/link"; // Import Link from Next.js
import { HiOutlineArrowLeft } from "react-icons/hi";
import { ToastContainer } from "react-toastify";
import AddToWatchlistModal from "@/app/ui/dashboard/WatchListModal/WatchListModal";
import { baseUrl,  } from "@/app/ui/enfile";
const StockChart = ({ params }) => {
  let symbol = null;
  if (params.id) {
    if (Array.isArray(params.id)) {
      symbol = params.id[0];
    } else {
      symbol = params.id;
    }
  } else {
    symbol = "AAPL"; // Default symbol
  }
  const [fromDate, setFromDate] = useState(
    dayjs().subtract(1, "year").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(
    dayjs().subtract(1, "day").format("YYYY-MM-DD")
  );

  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("candlestick");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${baseUrl}/wallofstreet/stockhistory`,
          {
            
              symbol: symbol,
              fields: "symbol,date,open,high,low,close",
              from: fromDate,
              to: toDate,
          }
        );
        setStockData(
          response.data.response
            .map((item) => ({
              time: new Date(item.date).getTime() / 1000,
              open: item.open,
              high: item.high,
              low: item.low,
              close: item.close,
            }))
            .sort((a, b) => a.time - b.time)
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white p-4">
      <div className="flex items-center mb-4">
        <Link href="/dashboard/live-stock">
          <p className="text-blue-400 hover:underline flex items-center gap-2x">
            <HiOutlineArrowLeft className="mr-1" /> Live Stock
          </p>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Stock Details</h1>
      <div className="w-full mb-4">
        <CompanyStockDetails symbol={symbol} />
      </div>
      <div className="flex mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded-md ${
            activeTab === "candlestick"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => handleTabChange("candlestick")}
        >
          Candlestick Chart
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "series"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => handleTabChange("series")}
        >
          Series Chart
        </button>
      </div>
      <div className="h-96">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            Loading...
          </div>
        ) : activeTab === "candlestick" ? (
          <ChartComponent
            data={stockData}
            colors={{ backgroundColor: "#182237", textColor: "white" }}
          />
        ) : (
          <SeriesChart
            data={stockData?.map((item) => ({
              time: item.time,
              value: parseFloat(item.close),
            }))}
            colors={{
              backgroundColor: "#182237",
              lineColor: "#2962FF",
              textColor: "white",
              areaTopColor: "#2962FF",
              areaBottomColor: "rgba(41, 98, 255, 0.28)",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default StockChart;
