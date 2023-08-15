import express from 'express'
import {
    getSubCourse,
    createSubCourse
} from "../controllers/SubCourse.js"
import { verifyUser, adminOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/subcourse', getSubCourse);
router.post('/subcourse',verifyUser, adminOnly, createSubCourse);




export default router;