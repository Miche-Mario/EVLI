import express from 'express'
import {
    getAbouts,
    getAboutById,
    createAbout,
    updateAbout,
    deleteAbout,
} from "../controllers/About.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/abouts', verifyUser,getAbouts);
router.get('/about/:id', verifyUser,getAboutById);
router.post('/about',verifyUser,adminOnly, createAbout);
router.patch('/about/:id',verifyUser,adminOnly, updateAbout);
router.delete('/about/:id', verifyUser,adminOnly,deleteAbout);



export default router;