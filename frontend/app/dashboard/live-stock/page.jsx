// MarketTrend.jsx

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PriceModal from "@/app/ui/dashboard/PriceModal/PriceModal";
import { FaBell } from "react-icons/fa";
import StockTable from "@/app/ui/dashboard/StockTable/StockTable";
import { UserAuth } from "@/app/ui/Context/Authcontext";
import Loader1 from "@/app/ui/Loader/Loader";
import { baseUrl } from "@/app/ui/enfile";

const MarketTrend = () => {
  const { user } = UserAuth();
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [alertPrice, setAlertPrice] = useState("");
  const [tempArr, settempArr] = useState([]);
  useEffect(() => {
    fetchStockData("AAPL,TSLA,GOOGL,AMZN,MSFT,FB,NFLX,NVDA,ADBE,INTC,CSCO,IBM,ORCL,SAP,CRM,PYPL,SQ");
  }, []);

  const fetchStockData = async (arr,isSearched) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/wallofstreet/livestockprice`,
        {
          fields: "symbol,price,percentChange,low,high,name,volume",
          symbols:arr
        },
      );
      setIndices(response?.data?.response || []);
     if(!isSearched) settempArr(response?.data?.response || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if(event.target.value===''){
   setIndices(tempArr);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSetAlert = (stock) => {
    setSelectedStock(stock);
    setAlertPrice("");
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAlertPriceChange = (event) => {
    setAlertPrice(event.target.value);
  };

  const handleSaveAlert = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-[#182237] text-[var(--text)] container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Live Stocks</h1>
     {
      loading?<Loader1/>:
      <>
       <div className="mb-4 flex items-center justify-between">
        <div className="flex-1 mr-4">
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border-2 bg-[#182237] focus:outline-none focus:border-blue-500"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={()=>{
            if(searchTerm===''){
   setIndices(tempArr);
   return;
            }
            fetchStockData(searchTerm,true);
          }}
        >
         Search
        </button>
      </div>

      {/* Render the StockTable component */}
      <StockTable
        indices={indices}
        sortConfig={sortConfig}
        handleSort={handleSort}
        handleSetAlert={handleSetAlert}
        disableOptions={false}
      />

      {/* Modal for setting price alert */}
      {showModal && selectedStock && (
        <PriceModal
          userId={user?.uid}
          email={user?.email}
          handleAlertPriceChange={handleAlertPriceChange}
          alertPrice={alertPrice}
          handleSaveAlert={handleSaveAlert}
          selectedStock={selectedStock}
          handleModalClose={handleModalClose}
        />
      )}
      </>
     }
    </div>
  );
};

export default MarketTrend;
