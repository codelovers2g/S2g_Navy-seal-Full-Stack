"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddToWatchlistModal from "../WatchListModal/WatchListModal";
import { baseUrl, } from "../../enfile";
import { UserAuth } from "../../Context/Authcontext";

const CompanyStockDetails = ({ symbol }) => {
  const { user } = UserAuth();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isWatchListAdded, setisWatchListAdded] = useState(false);
  const checkIsWatchListAdded = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/watchlist/checkIsStockExist?userId=${user?.uid}&&symbol=${symbol}`
      );
      if (data.found) setisWatchListAdded(true);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    checkIsWatchListAdded();
    const fetchCompanyData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${baseUrl}/wallofstreet/stockcompanydetails`,
          {
            
              fields:
                "symbol,companyName,industry,optionableStatus,ceo,website,country,city,address,ipoDate,beta,revenue,ebitda,netIncome",
              symbol: symbol,
          }
        );
        setCompanyData(response.data.response[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching company data:", error);
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [symbol]);

  const handleAddNotification = () => {
    // Implement your logic for adding notification here
  };
  const [showWatchlistModal, setshowWatchlistModal] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!companyData) {
    return <div>No data available for {symbol}</div>;
  }
  const closeWatchListModal = () => {
    setshowWatchlistModal(false);
  };
  const handleAddToWatchlist = () => {
    setshowWatchlistModal(true);
  };
  return (
    <div className="bg-[#182237] text-[var(--text)] container mx-auto px-4 py-8">
      {/* <ToastContainer /> */}
      {showWatchlistModal && (
        <AddToWatchlistModal
          userId={user?.uid}
          onClose={closeWatchListModal}
          stock={symbol}
        />
      )}
      <h1 className="text-3xl font-bold text-center mb-4">
        {companyData.companyName} ({companyData.symbol})
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Company Information</h2>
          <p>
            <strong>Industry:</strong> {companyData.industry}
          </p>
          <p>
            <strong>CEO:</strong> {companyData.ceo}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={companyData.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {companyData.website}
            </a>
          </p>
          <p>
            <strong>Location:</strong> {companyData.city}, {companyData.country}
          </p>
          <p>
            <strong>Address:</strong> {companyData.address}
          </p>
          <p>
            <strong>IPO Date:</strong> {companyData.ipoDate}
          </p>
          <p>
            <strong>Beta:</strong> {companyData.beta}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Financials</h2>
          <p>
            <strong>Revenue:</strong> {companyData.revenue}
          </p>
          <p>
            <strong>EBITDA:</strong> {companyData.ebitda}
          </p>
          <p>
            <strong>Net Income:</strong> {companyData.netIncome}
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-4">
      {!isWatchListAdded &&
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none"
          onClick={handleAddToWatchlist}
        >
             Add to Watchlist
        </button>}
      </div>
    </div>
  );
};

export default CompanyStockDetails;
