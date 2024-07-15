import priceNotification from "../../models/notification.model.js";
import { body, param } from "express-validator";
export const createWatchlistValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("symbol").notEmpty().withMessage("Symbol is required"),
  body("volume").notEmpty().withMessage("Volume must be a number"),
  body("price").notEmpty().withMessage("Price must be a number"),
  body("stockPrice").notEmpty().withMessage("Stock Price must be a number"),
  body("userId").notEmpty().withMessage("UserID is required"),
  body("email").notEmpty().withMessage("email is required"),
  body("priceCondition").notEmpty().withMessage("priceCondition is required"),
  
];
export const deleteByIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Id is required")
    .isMongoId()
    .withMessage("Id is invalid-delete")
    .custom(async (value) => {
      if (!value) return Promise.reject("stock  does not exist");
      const isExist = await priceNotification.findById(value);
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
      const isExist = await priceNotification.findOne({ userId: value });
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
      const isExist = await priceNotification.findOne(value);
      if (!isExist) return Promise.reject("stock  does not exist");
      return true;
    }),
];
