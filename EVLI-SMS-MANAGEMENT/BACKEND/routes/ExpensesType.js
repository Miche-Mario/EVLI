import express from 'express'
import {
    getExpensesType,
    getExpensesTypeById,
    createExpensesType,
    updateExpensesType,
    deleteExpensesType,
} from "../controllers/ExpensesType.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/expensestype',verifyUser, getExpensesType);
router.post('/expensestype',verifyUser,adminOnly, createExpensesType)
router.get('/expensestype/:id',verifyUser, getExpensesTypeById);
router.patch('/expensestype/:id',verifyUser,adminOnly, updateExpensesType);
router.delete('/expensestype/:id',verifyUser,adminOnly, deleteExpensesType);




export default router;