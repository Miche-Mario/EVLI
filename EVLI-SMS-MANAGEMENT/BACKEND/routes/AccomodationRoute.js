import express from 'express'
import {
    getAccomodations,
    getAccomodationPrice,
    createAccomodation,
    updateAccomodation,
    deleteAccomodation,
    getAccomodationById
} from "../controllers/Accomodations.js"
import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/accomodations', verifyUser,getAccomodations);
router.post('/accomodationprice',verifyUser, getAccomodationPrice);
router.get('/accomodation/:id',verifyUser, getAccomodationById);
router.patch('/accomodation/:id',verifyUser,adminOnly, updateAccomodation);
router.delete('/accomodation/:id',verifyUser,adminOnly, deleteAccomodation);
router.post('/accomodation',verifyUser,adminOnly, createAccomodation);




export default router;