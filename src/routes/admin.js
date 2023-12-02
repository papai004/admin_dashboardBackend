import express from "express";
import { body } from "express-validator";

import AdminController from "../controllers/admin/admin.controller.js";
import validationErrorHandler from "../middlewares/validationErrorHandler.js";

const router = express.Router();

const adminController = new AdminController();

router.post(
  "/create_data",
  [
    body("name").notEmpty(),
    body("email").notEmpty().isEmail(),
    body("role").notEmpty(),
  ],
  validationErrorHandler,
  adminController.createNewData
);

export default router;
