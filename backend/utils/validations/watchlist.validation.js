import stockWatchList from "../../models/watchlist.model.js";
import { body, param } from "express-validator";
export const createWatchlistValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("symbol").notEmpty().withMessage("Symbol is required"),
  body("volume").notEmpty().withMessage("Volume must be a number"),
  body("price").notEmpty().withMessage("Price must be a number"),
  body("userId").notEmpty().withMessage("UserID is required"),
];
export const deleteByIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Id is required")
    .isMongoId()
    .withMessage("Id is invalid-delete")
    .custom(async (value) => {
      if (!value) return Promise.reject("stock  does not exist");
      const isExist = await stockWatchList.findById(value);
      if (!isExist) return Promise.reject("stock  does not exist");
      return true;
    }),
];
export const getByUserIdValidation = [
  param("userId")
    .notEmpty()
    .withMessage("userId is required")

    .custom(async (value) => {
      if (!value) return Promise.reject("stock  does not exist");
      const isExist = await stockWatchList.findOne({ userId: value });
      if (!isExist) return Promise.reject("user Id  does not exist");
      return true;
    }),
];
export const getByIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Id is required")
    .isMongoId()
    .withMessage("Id is invalid-getidbyvalidation")
    .custom(async (value) => {
      if (!value) return Promise.reject("stock  does not exist");
      const isExist = await stockWatchList.findOne(value);
      if (!isExist) return Promise.reject("stock  does not exist");
      return true;
    }),
];
