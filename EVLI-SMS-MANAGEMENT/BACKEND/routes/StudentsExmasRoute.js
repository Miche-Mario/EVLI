import express from 'express'
import {
    getStudentsExams,
    createStudentsExams
} from "../controllers/StudentsExams.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/studentsexams',verifyUser, getStudentsExams);
router.post('/studentsexams',verifyUser, adminAndSuperOnly, createStudentsExams);




export default router;