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

router.post(
    "/get_data",
    [
      body("page")
        .notEmpty()
        .custom((value) => {
          /**
           * As the value will be passed as a string that's why first
           * converting that to number then doing the validation
           **/
          return +value > 0;
        }),
      body("size")
        .notEmpty()
        .custom((value) => {
          return +value > 0;
        }),
    ],
    validationErrorHandler,
    adminController.getData
  );

  router.post(
    "/delete_data",
    [
      body("email").notEmpty().isEmail(),
    ],
    validationErrorHandler,
    adminController.deleteData
  );

export default router;
