import express from 'express'
import {
    getPaymentMethods,
    createPaymentMethods,
    getPaymentMethodsById,
    deletePaymentMethods,
    updatePaymentMethods
} from "../controllers/PaymentMethods.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/paymentmethod',verifyUser, getPaymentMethods);
router.post('/paymentmethod',verifyUser, adminOnly, createPaymentMethods);
router.get('/paymentmethod/:id',verifyUser, getPaymentMethodsById);
router.delete('/paymentmethod/:id',verifyUser,adminOnly, deletePaymentMethods);
router.patch('/paymentmethod/:id',verifyUser,adminOnly, updatePaymentMethods);




export default router;