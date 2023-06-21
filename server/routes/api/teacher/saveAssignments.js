import express from 'express';
import saveAssignmentController from '../../../controllers/teacher/saveAssignmentController.js';

const router = express.Router();

router.post('/', saveAssignmentController.saveAssignment);

export default router;