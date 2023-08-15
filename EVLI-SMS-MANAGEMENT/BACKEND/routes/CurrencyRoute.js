import express from 'express'
import {
  getCuurency,
  createCurency,
  deleteCurrency,
  getCurrencyById,
  updateCurrency
} from "../controllers/Currency.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';
 
const router = express.Router();

router.get('/currency',verifyUser,  getCuurency);
router.get('/currency/:id',verifyUser,  getCurrencyById);
router.post('/currency',verifyUser,adminOnly,  createCurency);
router.patch('/currency/:id', verifyUser,adminOnly, updateCurrency);
router.delete('/currency/:id',verifyUser,adminOnly,  deleteCurrency);







export default router;