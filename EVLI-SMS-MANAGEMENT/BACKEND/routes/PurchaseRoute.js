import express from 'express'
import {
    getPurchases,
    getPurchasePrice,
    getPurchaseById,
    createPurchase,
    updatePurchase,
    deletePurchase
} from "../controllers/Purchases.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/purchases',verifyUser,   getPurchases);
router.post('/purchaseprice',verifyUser,   getPurchasePrice);
router.get('/purchase/:id',verifyUser,   getPurchaseById);
router.post('/purchase',verifyUser, adminOnly,  createPurchase);
router.patch('/purchase/:id',verifyUser, adminOnly,  updatePurchase);
router.delete('/purchase/:id',verifyUser, adminOnly,  deletePurchase);





export default router;