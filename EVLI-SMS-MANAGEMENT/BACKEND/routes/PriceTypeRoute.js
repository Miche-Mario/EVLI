import express from 'express'
import {
    getPriceType,
    createPriceType,
    deletePriceType,
    updatePriceType,
    getPriceTypeById
} from "../controllers/PriceTypes.js"

const router = express.Router();

router.get('/pricetype', getPriceType);
router.get('/pricetype/:id', getPriceTypeById);
router.patch('/pricetype/:id', updatePriceType);
router.delete('/pricetype/:id', deletePriceType);
router.post('/pricetype', createPriceType);




export default router;