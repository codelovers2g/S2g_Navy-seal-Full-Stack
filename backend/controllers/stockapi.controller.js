import express from "express";
import WallStreetOddsAPI from "../services/stock.service.js";
const {getLiveStockPrice,getStockCompanyDetails,getStockHistory}=WallStreetOddsAPI;
const app=express.Router();
app.post("/livestockprice",getLiveStockPrice);
app.post("/stockcompanydetails",getStockCompanyDetails);
app.post("/stockhistory",getStockHistory);
export default app;