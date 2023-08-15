import express from 'express'
import {
  getGroupDiscount,
  createGroupDiscount,
  getDiscountGroupById,
  updateDiscountGroup
} from "../controllers/GroupDiscount.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/groupdiscount',verifyUser, getGroupDiscount);
router.post('/groupdiscount',verifyUser, adminOnly, createGroupDiscount);
router.get('/groupdiscount/:id',verifyUser, getDiscountGroupById);
router.patch('/groupdiscount/:id', verifyUser, updateDiscountGroup);







export default router;