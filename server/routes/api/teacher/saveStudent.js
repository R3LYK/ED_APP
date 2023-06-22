import express from 'express'
import saveStudentController from '../../../controllers/teacher/saveStudentController.js'

const router = express.Router()

router.post('/:userId', saveStudentController.saveStudent);

export default router;