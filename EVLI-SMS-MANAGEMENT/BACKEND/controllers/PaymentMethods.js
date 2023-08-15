import PaymentMethods from "../models/PaymentMethodModels.js"
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"

export const getPaymentMethods = async (req,res) => {
    try {
        const response = await PaymentMethods.findAll({
            attributes: ['id','uuid', 'paymentname']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPaymentMethodsById = async(req,res) => {
    try {
        const response = await PaymentMethods.findOne({
            attributes: ['uuid', 'paymentname'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createPaymentMethods = async(req,res) => {
    const {paymentname} = req.body;
    try {
        await PaymentMethods.create({
            paymentname: paymentname
        });
        res.status(201).json({msg: "PaymentMethods Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updatePaymentMethods = async(req,res) => {
    const method = await PaymentMethods.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!method) return res.status(404).json({msg: "PaymentMethods doesn't not exist" });
    const {paymentname} = req.body;
    
    try {
        await PaymentMethods.update({
            paymentname: paymentname,
        }, {
            where: {
                id: method.id
            }
        });
        res.status(200).json({msg: "PaymentMethods  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const deletePaymentMethods = async(req,res) => {
    const method = await PaymentMethods.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!method) return res.status(404).json({msg: "PaymentMethods doesn't not exist" });
    try {
        await PaymentMethods.destroy({
            where: {
                id: method.id
            }
        });
        res.status(201).json({msg: "PaymentMethods Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}