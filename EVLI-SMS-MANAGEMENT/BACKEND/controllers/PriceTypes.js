import PriceType from "../models/PriceTypeModels.js"
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"

export const getPriceType = async (req,res) => {
    try {
        const response = await PriceType.findAll({
            attributes: ['uuid', 'id', 'pricetypename']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPriceTypeById = async(req,res) => {
    try {
        const response = await PriceType.findOne({
            attributes: ['uuid', 'pricetypename'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createPriceType = async(req,res) => {
    const {pricetypename} = req.body;
    try {
        await PriceType.create({
            pricetypename: pricetypename
        });
        res.status(201).json({msg: "PriceType Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updatePriceType = async(req,res) => {
    const pricetype = await PriceType.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!pricetype) return res.status(404).json({msg: "Price Type doesn't not exist" });
    const {pricetypename} = req.body;
    
    try {
        await PriceType.update({
            pricetypename: pricetypename,
        }, {
            where: {
                id: pricetype.id
            }
        });
        res.status(200).json({msg: "Price Type  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const deletePriceType = async(req,res) => {
    const pricetype = await PriceType.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!pricetype) return res.status(404).json({msg: "Price Type doesn't not exist" });
    try {
        await PriceType.destroy({
            where: {
                id: pricetype.id
            }
        });
        res.status(201).json({msg: "Price Type Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}