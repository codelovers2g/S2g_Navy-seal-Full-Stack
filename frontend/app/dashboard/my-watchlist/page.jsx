// MarketTrend.jsx

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PriceModal from "@/app/ui/dashboard/PriceModal/PriceModal";
import { FaBell } from "react-icons/fa";
import StockTable from "@/app/ui/dashboard/StockTable/StockTable";
import { UserAuth } from "@/app/ui/Context/Authcontext";
import { baseUrl } from "@/app/ui/enfile";
import Loader1 from "@/app/ui/Loader/Loader";

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

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `${baseUrl}/watchlist/byuser/${user?.uid}`
      );
      setIndices(data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    let value=event.target.value;
    setSearchTerm(value);
  };
  const filteredIndices = indices.filter((index) =>
    index.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedIndices = filteredIndices.sort((a, b) => {
    const factor = sortConfig.direction === "ascending" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return -1 * factor;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return 1 * factor;
    }
    return 0;
  });
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
      
      <h1 className="text-3xl font-bold text-center mb-4">My Watch List</h1>
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
      </div>

      <StockTable
        indices={sortedIndices}
        setIndices={setIndices}
        sortConfig={sortConfig}
        handleSort={handleSort}
        handleSetAlert={handleSetAlert}
        disableOptions={true}
      />
     </>
    }

    </div>
  );
};

export default MarketTrend;
