import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import AccoDiscount from "../models/AccoDiscountModels.js";

export const getAccoDiscount = async (req,res) => {
    try {
        const response = await AccoDiscount.findAll({
            attributes: ['uuid', 'from','pourcentage']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createAccoDiscount = async(req,res) => {
    const {from, pourcentage} = req.body;
    try {
        await AccoDiscount.create({
            from: from,
            pourcentage: pourcentage,
                });
        res.status(201).json({msg: "Acco Discount Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const getDiscountAccoById = async(req,res) => {
    try {
        const response = await AccoDiscount.findOne({
            attributes: ['uuid', 'from', 'pourcentage'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const updateDiscountAcco = async(req,res) => {
    const gdis = await AccoDiscount.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!gdis) return res.status(404).json({msg: "Acco Discount doesn't not exist" });
    const {from, pourcentage} = req.body;
    
    try {
        await AccoDiscount.update({
            from: from,
            pourcentage: pourcentage,
        }, {
            where: {
                id: gdis.id
            }
        });
        res.status(200).json({msg: "Acco Discount  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}



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
} */