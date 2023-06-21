import express from 'express';
import studentRegisterController from '../../controllers/studentRegisterController.js';

const router = express.Router();

router.post('/', studentRegisterController.handleNewStudent);

export default router;