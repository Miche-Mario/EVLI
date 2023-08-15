import OtherFee from "../models/OtherFeeModels.js"
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"


export const getOtherFee = async (req,res) => {
    try {
        const response = await OtherFee.findAll({
            attributes: ['uuid', 'id','feename', 'feeprice', 'description']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const getOtherFeeById = async(req,res) => {
    try {
        const response = await OtherFee.findOne({
            attributes: ['uuid', 'feename','feeprice', 'description'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getOtherFeePrice = async(req,res) => {
    const {otherFeeId} = req.body;

    try {
        const response = await OtherFee.findOne({
            attributes: ['id','feeprice', 'description'],
            where: {
                id: otherFeeId
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createOtherFee = async(req,res) => {
    const {feename, feeprice, description} = req.body;
    try {
        await OtherFee.create({
            feename: feename,
            feeprice: feeprice,
            description: description
        });
        res.status(201).json({msg: "OtherFee Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateOtherFee = async(req,res) => {
    const fee = await OtherFee.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!fee) return res.status(404).json({msg: "OtherFee doesn't not exist" });
    const {feename, feeprice, description} = req.body;
    
    try {
        await OtherFee.update({
            feename: feename,
            feeprice: feeprice,
            description: description
        }, {
            where: {
                id: fee.id
            }
        });
        res.status(200).json({msg: "OtherFee  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const deleteOtherFee = async(req,res) => {
    const fee = await OtherFee.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!fee) return res.status(404).json({msg: "OtherFee doesn't not exist" });
    try {
        await OtherFee.destroy({
            where: {
                id: fee.id
            }
        });
        res.status(201).json({msg: "OtherFee Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}