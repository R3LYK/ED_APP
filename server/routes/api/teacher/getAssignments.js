import express from "express";
import getAssignmentController from "../../../controllers/teacher/getAssignmentController.js";

//this would be better as a router.route that includes saveAssignments.js, 
//but I don't want to change all the 'saveAssignmentController' code (front and back) 
//to handle the id right now. It can be done when I clean up the backend later.

const router = express.Router();

router.get("/:teacherId", getAssignmentController.getAssignments);

export default router;