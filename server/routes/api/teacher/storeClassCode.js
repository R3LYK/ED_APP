import express from 'express';
import storeClassCodeController from '../../../controllers/teacher/storeClassCodeController.js';

const router = express.Router();

router.post('/', storeClassCodeController.storeClassCodes);

export default router;