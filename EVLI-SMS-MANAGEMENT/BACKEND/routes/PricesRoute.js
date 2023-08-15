import express from 'express'
import { updateCourses } from '../controllers/Courses.js';
import {
    getPrices,
    createPrices,
    getCoursesPrice
} from "../controllers/Prices.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/prices',verifyUser,  getPrices);
router.get('/prices/:id',verifyUser,  getCoursesPrice);
router.patch('/coursesprice/:id',verifyUser,  updateCourses);
router.post('/coursesprice',verifyUser,  getCoursesPrice);
router.post('/prices', verifyUser,adminOnly, createPrices);




export default router;