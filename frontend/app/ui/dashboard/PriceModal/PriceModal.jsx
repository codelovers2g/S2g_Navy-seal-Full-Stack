import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../enfile";
import { toast } from "react-toastify";

const PriceModal = ({
  selectedStock,
  handleModalClose,
  userId,
  email,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [alertPrice, setAlertPrice] = useState("");
  const [priceCondition, setPriceCondition] = useState("greater");

  const addNotification = async () => {
    setIsAdding(true);
    try {
      const notificationData = {
        userId,
       price: parseInt(alertPrice),
        name: selectedStock.name,
        stockPrice: selectedStock.price,
        symbol: selectedStock.symbol,
        volume: selectedStock.volume,
        email,
        priceCondition,
      };

      const { data } = await axios.post(`${baseUrl}/notification/`, notificationData);

      handleModalClose();
      setIsAdding(false);
      toast.success("Price notification has been added successfully.");
    } catch (error) {
      setIsAdding(false);
      toast.error("Failed to add price notification.");
    }
  };

  const handleAlertPriceChange = (e) => {
    setAlertPrice(e.target.value);
  };

  const handlePriceConditionChange = (e) => {
    setPriceCondition(e.target.value);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="min-w-[400px] bg-[#182237] text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">
            Set Price Alert for {selectedStock.name}
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Alert Price
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 text-[#182237] rounded-md border-2 border-gray-200 focus:outline-none focus:border-blue-500"
              placeholder="Enter alert price..."
              value={alertPrice}
              onChange={handleAlertPriceChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Price alert should be
            </label>
            <select
              className="w-full px-3 py-2 text-[#182237] rounded-md border-2 border-gray-200 focus:outline-none focus:border-blue-500"
              value={priceCondition}
              onChange={handlePriceConditionChange}
            >
              <option value="greater">Greater than</option>
              <option value="greaterOrEqual">Greater than or equal to</option>
              <option value="lower">Lower than</option>
              <option value="lowerOrEqual">Lower than or equal to</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none"
              onClick={addNotification}
            >
              Save
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
              onClick={handleModalClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceModal;
