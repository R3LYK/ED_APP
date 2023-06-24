import express from "express";
import saveAssignmentController from "../../../controllers/teacher/saveAssignmentController.js";

//this would be better as a router.route that includes getAssignments.js, 
//but I don't want to change all the 'saveAssignmentController' code (front and back) 
//to handle the id right now. It can be done when I clean up the backend later.

const router = express.Router();

router.post("/", saveAssignmentController.saveAssignment);

export default router;
