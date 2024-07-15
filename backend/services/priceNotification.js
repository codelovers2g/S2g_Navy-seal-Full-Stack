import priceNotificationModel from "../models/notification.model.js";
import { addHtml, sendNotification } from "../utils/Email/custom.js";

class priceNotification {
  // Create a new watchlist item
  static create = async (req, res) => {
    try {
      const {
        name,symbol,volume,price,stockPrice,userId,email,
        priceCondition
      } = req.body;
      const newItem = await priceNotificationModel.create({name,symbol,volume,userId,email,
        futureStockPrice:price,
        currentStockPrice:stockPrice,
        priceCondition
      });
      const html = addHtml("Mr", name, symbol, price,stockPrice);
      sendNotification(email, html, "Demo price notification");
      return res
        .status(200)
        .json({ msg: "watchlist item created successfully" });
    } catch (error) {
      return res.status(500).json({ msg: "unable to create watchlist item" });
    }
  };
  static checkStock = async (req, res) => {
    try {
      const userId = req.query.userId;
      const symbol = req.query.symbol;
      const watchlist = await priceNotificationModel.findOne({
        userId,
        symbol,
      });
      if (!watchlist) {
        return res
          .status(200)
          .json({ msg: "Watchlist item not found", found: false });
      }
      return res.status(200).json({ msg: "Stock is up to date", found: true });
    } catch (error) {
      return res.status(500).json({ msg: "Unable to check stock" });
    }
  };
  // Delete a watchlist item by ID
  static deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedItem = await priceNotificationModel.findByIdAndDelete(id);
      if (!deletedItem) {
        return res.status(404).json({ msg: "Watchlist item not found" });
      }
      return res
        .status(200)
        .json({ msg: "Watchlist item deleted successfully" });
    } catch (error) {
      return res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
  };

  // Get all watchlist items
  static getAll = async (req, res) => {
    try {
      const items = await priceNotificationModel.find();
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
  };

  // Get all watchlist items by user ID
  static getAllByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const items = await priceNotificationModel.find({ userId });
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
  };

  // Get a watchlist item by ID
  static getById = async (req, res) => {
    const { id } = req.params;
    try {
      const item = await priceNotificationModel.findById(id);
      if (!item) {
        return res.status(400).json({ msg: "Watchlist item not found" });
      }
      return res
        .status(200)
        .json({ message: "watchlist item deleted successfully" });
    } catch (error) {
      return res.status(500).json({ msg: `Server Error: ${error.message}` });
    }
  };
}

export default priceNotification;
