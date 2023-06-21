import express from 'express';
import deleteConvoController from '../../../controllers/teacher/deleteConvoController.js';

const router = express.Router();

router.delete('/:userId', deleteConvoController.deleteConvoController);

export default router;