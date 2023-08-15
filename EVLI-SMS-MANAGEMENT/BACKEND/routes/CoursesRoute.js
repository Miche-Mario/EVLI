import express from 'express'
import {
    getCourses,
    createCourses,
    getCoursesById,
    deleteCourses,
    getCourseWithSubcourse,
    getCoursesPrice
} from "../controllers/Courses.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.post('/getcourses',verifyUser, getCourses);
router.post('/getsubcourse',verifyUser, getCourseWithSubcourse);
router.post('/getcoursesprice',verifyUser, getCoursesPrice);
router.delete('/courses/:id',verifyUser, adminOnly,deleteCourses);
router.post('/courses',verifyUser, adminOnly,createCourses);
router.get('/courses/:id', verifyUser, getCoursesById);





export default router;