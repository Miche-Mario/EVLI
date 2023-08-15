import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import GroupDiscount from "../models/GroupDiscountModels.js";

export const getGroupDiscount = async (req,res) => {
    try {
        const response = await GroupDiscount.findAll({
            attributes: ['uuid', 'name','pourcentage']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createGroupDiscount = async(req,res) => {
    const {name, pourcentage} = req.body;
    try {
        await GroupDiscount.create({
            name: name,
            pourcentage: pourcentage,
                });
        res.status(201).json({msg: "Group Discount Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const getDiscountGroupById = async(req,res) => {
    try {
        const response = await GroupDiscount.findOne({
            attributes: ['uuid', 'name', 'pourcentage'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const updateDiscountGroup = async(req,res) => {
    const gdis = await GroupDiscount.findOne({
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
}
export const deleteExam = async(req,res) => {
    const exam = await Exam.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!exam) return res.status(404).json({msg: "Exam doesn't not exist" });
    try {
        await Exam.destroy({
            where: {
                id: exam.id
            }
        });
        res.status(201).json({msg: "Exam Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

} */