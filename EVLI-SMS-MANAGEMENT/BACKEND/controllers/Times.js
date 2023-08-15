import Time from "../models/TimeModels.js"
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"

export const getAllTime = async (req,res) => {
    try {
        const response = await Time.findAll({
            attributes: ['id','uuid', 'time'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getTime = async (req,res) => {
    const {number} = req.body;
    try {
        const response = await Time.findAll({
            attributes: ['id','uuid', 'time'],
            limit: number,
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getTimeById = (req,res) => {
    
}
export const createTime = async(req,res) => {
    const {time} = req.body;
    try {
        await Time.create({
            time: time
        });
        res.status(201).json({msg: "Time Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const updateAbout = (req,res) => {
    
}
export const deleteAbout = (req,res) => {
    
}