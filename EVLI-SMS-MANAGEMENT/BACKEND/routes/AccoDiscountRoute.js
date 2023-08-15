import express from 'express'
import {
  getAccoDiscount,
  createAccoDiscount,
  getDiscountAccoById,
  updateDiscountAcco
} from "../controllers/AccoDiscount.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/accodiscount',verifyUser, getAccoDiscount);
router.post('/accodiscount',verifyUser, adminOnly, createAccoDiscount);
router.get('/accodiscount/:id',verifyUser, getDiscountAccoById);
router.patch('/accodiscount/:id', verifyUser, updateDiscountAcco);







export default router;