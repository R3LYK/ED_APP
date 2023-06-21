import express from 'express';
import persistentController from '../../controllers/openAI/persistConvoController.js';

const router = express.Router();

router.post('/queryGPT/:userId', persistentController.handleOpenAIRequest);

export default router;

