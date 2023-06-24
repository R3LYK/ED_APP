import express from 'express';
import getTeacherCohortsController from '../../../controllers/teacher/getTeacherCohortsController.js';

const router = express.Router();

router.route('/:teacherId')
    .get(getTeacherCohortsController.getTeacherCohorts)

export default router;