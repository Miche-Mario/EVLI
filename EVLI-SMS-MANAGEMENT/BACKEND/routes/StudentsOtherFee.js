import express from 'express'
import {
  getStudentsOtherFee
} from "../controllers/StudentsOtherFee.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/studentotherfee',verifyUser,adminAndSuperOnly, getStudentsOtherFee);





export default router;