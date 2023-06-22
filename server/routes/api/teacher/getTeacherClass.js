import express from 'express';
import getTeacherClassController from '../../../controllers/teacher/getTeacherClassController.js';

const router = express.Router();

router.route('/:userId')
  .get(getTeacherClassController.getTeacherClass)

export default router;
