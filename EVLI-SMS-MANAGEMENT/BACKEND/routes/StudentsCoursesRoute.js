import express from 'express'
import {
    getStudentsCourses,
    getProgram
} from "../controllers/StudentsCourses.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/studentscourses',verifyUser,adminAndSuperOnly, getStudentsCourses);
router.get('/getprogram/:id',verifyUser,adminAndSuperOnly, getProgram);





export default router;