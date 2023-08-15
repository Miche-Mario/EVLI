import express from 'express'
import {
    getStudentsPurchases,
    createStudentsPurchases
} from "../controllers/StudentsPurchases.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/studentspurchases',verifyUser, adminAndSuperOnly,getStudentsPurchases);
router.post('/studentspurchases',verifyUser,adminAndSuperOnly, createStudentsPurchases);




export default router;