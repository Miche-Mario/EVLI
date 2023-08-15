import ClassType from "../models/ClassTypeModels.js"
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"

export const getClassType = async (req,res) => {
    try {
        const response = await ClassType.findAll({
            attributes: ['uuid', 'id','classtypename']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getClassTypeById = async(req,res) => {
    try {
        const response = await ClassType.findOne({
            attributes: ['uuid', 'classtypename'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createClassType = async(req,res) => {
    const {classtypename} = req.body;
    try {
        await ClassType.create({
            classtypename: classtypename
        });
        res.status(201).json({msg: "ClassType Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateClassType = async(req,res) => {
    const classtype = await ClassType.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!classtype) return res.status(404).json({msg: "Class Type doesn't not exist" });
    const {classtypename} = req.body;
    
    try {
        await ClassType.update({
            classtypename: classtypename,
        }, {
            where: {
                id: classtype.id
            }
        });
        res.status(200).json({msg: "Class Type  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const deleteClassType = async(req,res) => {
    const classtype = await ClassType.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!classtype) return res.status(404).json({msg: "Class Type doesn't not exist" });
    try {
        await ClassType.destroy({
            where: {
                id: classtype.id
            }
        });
        res.status(201).json({msg: "Class Type Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}