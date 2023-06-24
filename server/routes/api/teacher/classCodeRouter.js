import express from "express";
import addNewClassCodeController from "../../../controllers/teacher/addNewClassCodeController.js";
import getExistClassCodeController from "../../../controllers/teacher/getExistClassCodeController.js";

const router = express.Router();

router
  .route("/")
  .get(getExistClassCodeController.getClassCode)
  .post(addNewClassCodeController.addClassCode);

export default router;
