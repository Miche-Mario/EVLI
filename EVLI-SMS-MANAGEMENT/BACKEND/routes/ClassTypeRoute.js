import express from 'express'
import {
    getClassType,
    createClassType,
    updateClassType,
    deleteClassType,
    getClassTypeById
} from "../controllers/ClassTypes.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/classtype',verifyUser, getClassType);
router.get('/classtype/:id', verifyUser,getClassTypeById);
router.patch('/classtype/:id',verifyUser,adminOnly, updateClassType);
router.delete('/classtype/:id',verifyUser,adminOnly, deleteClassType);
router.post('/classtype', verifyUser,adminOnly, createClassType);




export default router;