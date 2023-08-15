import express from 'express'
import {
    getStudentsAccomodations,
    createStudentsAccomodations
} from "../controllers/StudentsAccomodations.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/studentsaccomodations',verifyUser,adminAndSuperOnly, getStudentsAccomodations);
router.post('/studentsaccomodations',verifyUser, adminOnly,adminAndSuperOnly, createStudentsAccomodations);




export default router;