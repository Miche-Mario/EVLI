import express from 'express'
import {
    getRegistration,
    createRegistration,
    updateRegistration,
    deleteRegistration
} from "../controllers/Registration.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/registration',verifyUser, getRegistration);
router.patch('/registration/:id',verifyUser,adminOnly, updateRegistration);
router.delete('/registration/:id',verifyUser,adminOnly,  deleteRegistration);
router.post('/registration', createRegistration);




export default router;