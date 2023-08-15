import Log from "../models/LogModels.js";
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import Students from "../models/StudentsModels.js";
import Users from "../models/UsersModels.js";

export const getLog = async (req,res) => {
    const {startDate, endDate} = req.body;

    try {
        const response = await Log.findAll({
            attributes: ['id','uuid', 'info', 'createdAt'],
            include: [{
                model: Users
            }]
            ,
              where: {
                createdAt: {
                    [Op.between] : [startDate, endDate]
                }
              }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getLogById = async(req, res) => {
    try {
        const response = await Log.findOne({
            attributes: ['id','uuid', 'info', 'createdAt'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const deleteLog = async(req,res) => {
    const log = await Log.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!log) return res.status(404).json({msg: "Log doesn't not exist" });
    try {
        await Log.destroy({
            where: {
                id: log.id
            }
        });
        res.status(201).json({msg: "Log Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}