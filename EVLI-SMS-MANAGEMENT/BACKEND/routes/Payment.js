import express from 'express'
import {
  getPayment,
  getPaymentById,
  updatePayment,
  createPayment,
  deleteLastPayment
} from "../controllers/Payment.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/payment',verifyUser,adminAndSuperOnly, getPayment);
router.post('/createpayment',verifyUser,adminAndSuperOnly, createPayment)
router.get('/paymentbyid/:id',verifyUser,adminAndSuperOnly, getPaymentById);
router.patch('/payment/:id',verifyUser,adminAndSuperOnly, updatePayment);
router.patch('/paymentt/:id',verifyUser,adminAndSuperOnly, deleteLastPayment);









export default router;