import express from 'express'
import {
    getExams,
    getExamById,
    getExamPrice,
    updateExam,
    deleteExam,
    createExam,
} from "../controllers/Exams.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/exam',verifyUser, getExams);
router.post('/examprice',verifyUser,getExamPrice)
router.get('/exam/:id',verifyUser, getExamById);
router.patch('/exam/:id',verifyUser, adminOnly,updateExam);
router.delete('/exam/:id',verifyUser, adminOnly,deleteExam);
router.post('/exam',verifyUser,adminOnly, createExam);




export default router;