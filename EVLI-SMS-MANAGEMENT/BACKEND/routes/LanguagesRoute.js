import express from 'express'
import {
    getLanguage,
    createLanguage,
    getLanguageById,
    deleteLanguage,
    updateLanguage
} from "../controllers/Languages.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/language',verifyUser, getLanguage);
router.post('/language',verifyUser, adminOnly, createLanguage);
router.get('/language/:id',verifyUser, getLanguageById);
router.delete('/language/:id',verifyUser, adminOnly, deleteLanguage);
router.patch('/language/:id',verifyUser,adminOnly, updateLanguage);




export default router;