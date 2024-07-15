import express from "express";
import {
  createWatchlistValidation,
  getByIdValidation,
  getByUserIdValidation,
  deleteByIdValidation,
} from "../utils/validations/priceNotification.validation.js";
import watchlistService from "../services/priceNotification.js";
import customError from "../utils/CustomError/customerError.js";
const { create, getAll, getById, getAllByUserId, deleteById, checkStock } =
  watchlistService;
const app = express.Router();
app.post("/", createWatchlistValidation, customError, create);
app.get("/", getAll);
app.get("/byuser/:userId", getByUserIdValidation, customError, getAllByUserId);
app.delete("/:id", deleteByIdValidation, customError, deleteById);
app.get("/checkIsNotificationExist", checkStock);
export default app;
