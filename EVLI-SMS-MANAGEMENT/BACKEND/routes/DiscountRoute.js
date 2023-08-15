import express from 'express'
import {
  getDiscount,
  createDiscount,
  deleteDiscount,
  getDiscountByCode
} from "../controllers/Discount.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/discount',verifyUser, getDiscount);
router.post('/discount',verifyUser, adminOnly, createDiscount);
router.post('/discountcode',verifyUser, getDiscountByCode);

router.delete('/discount/:id',verifyUser,adminOnly, deleteDiscount);







export default router;