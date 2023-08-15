import express from 'express'
import {
    getOtherFee,
    getOtherFeePrice,
    createOtherFee,
    updateOtherFee,
    deleteOtherFee,
    getOtherFeeById
} from "../controllers/OtherFee.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/otherfee', verifyUser,getOtherFee);
router.post('/otherfeeprice',verifyUser, getOtherFeePrice);
router.get('/otherfee/:id',verifyUser, getOtherFeeById);
router.patch('/otherfee/:id',verifyUser, adminOnly,updateOtherFee);
router.delete('/otherfee/:id',verifyUser,adminOnly, deleteOtherFee);
router.post('/otherfee',verifyUser,adminOnly, createOtherFee);




export default router;