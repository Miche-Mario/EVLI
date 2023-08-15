import express from 'express'
import {
    getProspects,
    getProspectById,
    createProspect,
    updateProspect,
    deleteProspect,
    upload,
    getProspectByProspectId,
    createProspectInProspect
} from "../controllers/Prospects.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/prospects', verifyUser, getProspects);
router.post('/prospectbyid',verifyUser,  getProspectByProspectId);
router.get('/prospects/:id', verifyUser, getProspectById);
router.post('/prospects',verifyUser, upload, createProspect);
router.post('/prospectsin', verifyUser, createProspectInProspect);
router.patch('/prospects/:id',verifyUser,  updateProspect);
router.delete('/prospects/:id',verifyUser,  deleteProspect);



export default router;