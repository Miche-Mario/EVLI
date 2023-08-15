import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import Discount from "../models/DiscountModels.js";
import Students from "../models/StudentsModels.js";

export const getDiscount = async (req,res) => {
    try {
        const response = await Discount.findAll({
            attributes: ['uuid','id', 'code','pourcentage', 'used', 'createdAt'],
            include: [{
                model: Students
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getDiscountByCode = async(req,res) => {
    const {code} = req.body;

    try {
        const response = await Discount.findOne({
            attributes: ['uuid','id', 'code', 'pourcentage'],
            where: {
                code: code,
                used: false
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createDiscount = async(req,res) => {
    const {code, pourcentage} = req.body;

    const codee = await Discount.findOne({
        where: {
            code: code
        }
    });
    if(codee) return res.status(404).json({msg: "Ce code Existe déjà" });
    try {
        await Discount.create({
            code: "EVLI" + code,
            pourcentage: pourcentage,
            used: false
        });
        res.status(201).json({msg: " Discount Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const deleteDiscount = async(req,res) => {
    const dis = await Discount.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!dis) return res.status(404).json({msg: "Discount doesn't not exist" });
    try {
        await Discount.destroy({
            where: {
                id: dis.id
            }
        });
        res.status(201).json({msg: "Discount Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

/*  */
/* export const updateDiscount = async(req,res) => {
    const gdis = await Discount.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!gdis) return res.status(404).json({msg: "Group Discount doesn't not exist" });
    const {name, pourcentage} = req.body;
    
    try {
        await GroupDiscount.update({
            name: name,
            pourcentage: pourcentage,
        }, {
            where: {
                id: gdis.id
            }
        });
        res.status(200).json({msg: "Group Discount  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
} */
/* 
export const getExamById = async(req,res) => {
    try {
        const response = await Exam.findOne({
            attributes: ['uuid', 'examname', 'examprice', 'description'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getExamPrice = async(req,res) => {
    const {examid} = req.body;

    try {
        const response = await Exam.findOne({
            attributes: ['id', 'examprice', 'description'],
            where: {
                id: examid
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createExam = async(req,res) => {
    const {examname, examprice, description} = req.body;
    try {
        await Exam.create({
            examname: examname,
            examprice: examprice,
            description: description
        });
        res.status(201).json({msg: "Exam Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateExam = async(req,res) => {
    const exam = await Exam.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!exam) return res.status(404).json({msg: "Exam doesn't not exist" });
    const {examname, examprice, description} = req.body;
    
    try {
        await Exam.update({
            examname: examname,
            examprice: examprice,
            description: description
        }, {
            where: {
                id: exam.id
            }
        });
        res.status(200).json({msg: "Exam  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


} */