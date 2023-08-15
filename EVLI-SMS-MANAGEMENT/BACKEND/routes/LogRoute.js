import express from 'express'
import {
    getLog,
    getLogById,
    deleteLog,
   
} from "../controllers/Log.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.post('/log',verifyUser,adminOnly, getLog);
router.get('/getLogById/:id',verifyUser,adminOnly, getLogById);
router.delete('/log/:id',verifyUser,adminOnly, deleteLog);




export default router;