// StockTable.jsx

import React from "react";
import { FaArrowUp, FaArrowDown, FaBell } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import { baseUrl } from "../../enfile";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const StockTable = ({
  indices,
  sortConfig,
  handleSort,
  handleSetAlert,
  disableOptions,
  setIndices
}) => {
  let sortedIndices = indices.sort((a, b) => {
    const factor = sortConfig.direction === "ascending" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return -1 * factor;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return 1 * factor;
    }
    return 0;
  });
  const router=useRouter()
  const deleteWatchList = async (id) => {
    try {
      const { data } = await axios.delete(`${baseUrl}/watchlist/${id}`);
      let arr = sortedIndices.filter((data) => data._id !== id);
      setIndices(arr);
      sortedIndices=arr;
      router.push('/dashboard/my-watchlist');
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="overflow-x-auto">
      {
        sortedIndices.length==0?<h1 className="text-center text-white">No data Found</h1>:
      <table className="min-w-full bg-[#182237] border border-gray-300">
        <thead>
          <tr className="bg-[#182237]">
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name{" "}
              {sortConfig.key === "name" &&
                (sortConfig.direction === "ascending" ? (
                  <FaArrowUp className="inline-block w-4 h-4 ml-1" />
                ) : (
                  <FaArrowDown className="inline-block w-4 h-4 ml-1" />
                ))}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("symbol")}
            >
              Symbol{" "}
              {sortConfig.key === "symbol" &&
                (sortConfig.direction === "ascending" ? (
                  <FaArrowUp className="inline-block w-4 h-4 ml-1" />
                ) : (
                  <FaArrowDown className="inline-block w-4 h-4 ml-1" />
                ))}
            </th>
            <th
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Price{" "}
              {sortConfig.key === "price" &&
                (sortConfig.direction === "ascending" ? (
                  <FaArrowUp className="inline-block w-4 h-4 ml-1" />
                ) : (
                  <FaArrowDown className="inline-block w-4 h-4 ml-1" />
                ))}
            </th>
            {!disableOptions && (
              <>
                {" "}
                <th
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("low")}
                >
                  Low{" "}
                  {sortConfig.key === "low" &&
                    (sortConfig.direction === "ascending" ? (
                      <FaArrowUp className="inline-block w-4 h-4 ml-1" />
                    ) : (
                      <FaArrowDown className="inline-block w-4 h-4 ml-1" />
                    ))}
                </th>
                <th
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("high")}
                >
                  High{" "}
                  {sortConfig.key === "high" &&
                    (sortConfig.direction === "ascending" ? (
                      <FaArrowUp className="inline-block w-4 h-4 ml-1" />
                    ) : (
                      <FaArrowDown className="inline-block w-4 h-4 ml-1" />
                    ))}
                </th>
                <th
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("percentChange")}
                >
                  Chg. %{" "}
                  {sortConfig.key === "percentChange" &&
                    (sortConfig.direction === "ascending" ? (
                      <FaArrowUp className="inline-block w-4 h-4 ml-1" />
                    ) : (
                      <FaArrowDown className="inline-block w-4 h-4 ml-1" />
                    ))}
                </th>
              </>
            )}
            <th
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("volume")}
            >
              Volume{" "}
              {sortConfig.key === "volume" &&
                (sortConfig.direction === "ascending" ? (
                  <FaArrowUp className="inline-block w-4 h-4 ml-1" />
                ) : (
                  <FaArrowDown className="inline-block w-4 h-4 ml-1" />
                ))}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedIndices.map((index) => (
            <tr key={index.symbol}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/dashboard/live-stock/${index.symbol}`}>
                  {index.name}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{index.symbol}</td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                {index.price?.toFixed(2)}
              </td>
              {!disableOptions && (
                <>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {index.low?.toFixed(2)}
                  </td>
                  <td className={`px-6 py-4 text-right whitespace-nowrap `}>
                    {index.high?.toFixed(2)}
                  </td>
                  <td
                    className={`px-6 py-4 text-right whitespace-nowrap ${
                      index.percentchange >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {index.percentchange?.toFixed(2)}%
                  </td>
                </>
              )}
              <td className="px-6 py-4 text-right whitespace-nowrap">
                {index.volume}
              </td>
              <td className="px-4 py-2">
                {disableOptions ? (
                  <button
                    className="text-blue-500 hover:text-red-700 focus:outline-none"
                    onClick={() => deleteWatchList(index._id)}
                  >
                    <MdDeleteOutline className="inline-block w-4 h-4 text-lg" />
                  </button>
                ) : (
                  <button
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    onClick={() => handleSetAlert(index)}
                  >
                    <FaBell className="inline-block w-4 h-4" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
};

export default StockTable;
