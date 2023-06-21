import express from 'express';
import teacherRegisterController from '../../controllers/teacherRegisterController.js';

const router = express.Router();

router.post('/', teacherRegisterController.handleNewTeacher);

export default router;
