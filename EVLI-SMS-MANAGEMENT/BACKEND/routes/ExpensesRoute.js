import express from 'express'
import {
    getAllExpensesInTwoDates,
    getExpensesById,
    createExpenses,
    updateExpenses,
    deleteExpenses,
    
} from "../controllers/Expenses.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.post('/expensesbetweeen',verifyUser,adminAndSuperOnly, getAllExpensesInTwoDates);
router.post('/expenses',verifyUser,adminAndSuperOnly, createExpenses);
router.get('/expenses/:id',verifyUser,adminAndSuperOnly, getExpensesById);
router.patch('/expenses/:id',verifyUser,adminAndSuperOnly, deleteExpenses);




export default router;