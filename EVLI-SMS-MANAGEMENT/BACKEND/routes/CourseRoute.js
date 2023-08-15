import express from 'express'
import {
    getCourse,
    createCourse,
    getCourseList
} from "../controllers/Course.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/course',verifyUser, getCourse);
router.get('/courselist',verifyUser, getCourseList);

router.post('/course',verifyUser, createCourse);




export default router;