import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define schema for stock watchlist
const stockWatchlistSchema = new Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  volume: { type: Number, required: true },
  price: { type: Number, required: true },
  userId: { type: String, required: true }, // Reference to User model
  createdAt: { type: Date, default: Date.now },
});

// Create model for stock watchlist
const StockWatchlist = mongoose.model("StockWatchlist", stockWatchlistSchema);

export default StockWatchlist;
