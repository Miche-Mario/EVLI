import express from 'express'
import {
    getPaymentStatus,
    getPaymentStatusById,
    createPaymentStatus,
    updatePaymentStatus,
    deletePaymentStatus,
} from "../controllers/PaymentStatus.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/paymentstatuss', verifyUser,getPaymentStatus);
router.get('/paymentstatus/:id', verifyUser,getPaymentStatusById);
router.post('/paymentstatus',verifyUser,adminOnly, createPaymentStatus);
router.patch('/paymentstatus/:id',verifyUser,adminOnly, updatePaymentStatus);
router.delete('/paymentstatus/:id', verifyUser,adminOnly,deletePaymentStatus);



export default router;