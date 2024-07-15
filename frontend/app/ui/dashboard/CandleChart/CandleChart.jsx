"use client";
import React, { useState, useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";
const ChartComponent = (props) => {
  const {
    data,
    colors: { backgroundColor = "#182237", textColor = "white" } = {},
  } = props;

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const candlestickSeries = chart.addCandlestickSeries();
    candlestickSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, backgroundColor, textColor]);

  return <div ref={chartContainerRef} className="w-full h-full" />;
};
export default ChartComponent;
