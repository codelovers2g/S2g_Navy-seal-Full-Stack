// AddToWatchlistModal.jsx
"use client";
import axios from "axios";
import React, { useState } from "react";
import { baseUrl,  } from "../../enfile";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AddToWatchlistModal = ({ onClose, stock, userId }) => {
  const [isAdding, setisAdding] = useState(false);
  const [Indices, setIndices] = useState({});
  const router=useRouter();
  const fetchStockData = async () => {
   

    try {
      const response = await axios.post(`${baseUrl}/wallofstreet/livestockprice`,
        {
          fields: "symbol,price,percentChange,low,high,name,volume",
          symbols: stock,
        },

      );
      setIndices(response.data?.response[0] || []);
      return response?.data?.response[0];

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong")
    }
  };
  const AddToWatchList = async () => {
    setisAdding(true);
    try {
    let outputData=  await fetchStockData();
      const obj = {
        name: outputData.name,
        symbol: outputData.symbol,
        volume: outputData.volume,
        price: outputData.price,
      };
   if(!outputData)
   {
     alert("Please try again later")
     return 0;
   }
      const { data } = await axios.post(`${baseUrl}/watchlist/`, {
        userId,
        name: outputData.name,
        symbol: outputData.symbol,
        volume: outputData.volume,
        price: outputData.price,
      });
      setisAdding(false);
      //   Toast.success("Added to watchlist");
      router.push("/dashboard/my-watchlist");

      onClose();
    } catch (error) {
      setisAdding(false);
      //   Toast.error("Failed to add to watchlist");
      toast.error("Failed to add to watchlist");
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#182237] rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add to Watchlist</h2>
        <p className="mb-6">
          Do you want to add {stock} to your watchlist?
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={AddToWatchList}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >

            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToWatchlistModal;
