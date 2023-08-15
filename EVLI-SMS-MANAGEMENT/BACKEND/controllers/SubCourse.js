import SubCourse from "../models/SubCourseModels.js"
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"

export const getSubCourse = async (req,res) => {
    try {
        const response = await SubCourse.findAll({
            attributes: ['id','uuid', 'subcoursename']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getSubCourseById = (req,res) => {
    
}
export const createSubCourse = async(req,res) => {
    const {subcoursename} = req.body;
    try {
        await SubCourse.create({
            subcoursename: subcoursename
        });
        res.status(201).json({msg: "SubCourse Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateSubCourse = (req,res) => {
    
}
export const deleteSubCourse = (req,res) => {
    
}