import express from 'express'
import {
  getInvoice,
  createInvoice
} from "../controllers/Invoice.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.post('/getinvoice',verifyUser, getInvoice);
router.post('/invoice',verifyUser, createInvoice);





export default router;