import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import PaymentStatus from "../models/PaymentStatusModels.js";

export const getPaymentStatus = async (req,res) => {
    try {
        const response = await PaymentStatus.findAll({
            attributes: ['id','uuid', 'status']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getPaymentStatusById = async(req, res) => {
    try {
        const response = await About.findOne({
            attributes: ['uuid', 'status'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
4
export const createPaymentStatus = async(req,res) => {
    const {aboutname} = req.body;
    try {
        await About.create({
            aboutname: aboutname
        });
        res.status(201).json({msg: "Payment Status Successfully created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


export const updatePaymentStatus = async(req,res) => {
    const status = await PaymentStatus.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!status) return res.status(404).json({msg: "Payment status doesn't not exist" });
    const {statusname} = req.body;
    
    try {
        await PaymentStatus.update({
            status: statusname
        }, {
            where: {
                id: status.id
            }
        });
        res.status(200).json({msg: "Payment status  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


export const deletePaymentStatus  = async(req,res) => {
    const status = await PaymentStatus.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!status) return res.status(404).json({msg: "Payment status doesn't not exist" });
    try {
        await PaymentStatus.destroy({
            where: {
                id: status.id
            }
        });
        res.status(201).json({msg: "Payment status Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}