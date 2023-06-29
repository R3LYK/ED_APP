import express from 'express';
import eventController from '../../controllers/eventController.js';

const router = express.Router();

router.post('/:userId', eventController.createAssignmentEvent);

export default router;