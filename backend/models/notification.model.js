import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define schema for stock price notification
const stockPriceNotificationSchema = new Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  volume: { type: Number, required: true },
  futureStockPrice: { type: Number, required: true },
  currentStockPrice:{ type: Number, required: true },
  userId: { type: String, required: true },
  email: { type: String, required: true },
  priceCondition: { type: String, required: true },
  
  createdAt: { type: Date, default: Date.now },
});

// Create model for stock price notification
const StockPriceNotification = mongoose.model(
  "StockPriceNotification",
  stockPriceNotificationSchema
);

export default StockPriceNotification;
