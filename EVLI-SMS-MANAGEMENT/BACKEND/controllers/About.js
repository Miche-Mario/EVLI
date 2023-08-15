import About from "../models/AboutModels.js"
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"

export const getAbouts = async (req,res) => {
    try {
        const response = await About.findAll({
            attributes: ['id','uuid', 'aboutname']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getAboutById = async(req, res) => {
    try {
        const response = await About.findOne({
            attributes: ['uuid', 'aboutname'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createAbout = async(req,res) => {
    const {aboutname} = req.body;
    try {
        await About.create({
            aboutname: aboutname
        });
        res.status(201).json({msg: "About Successfully created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateAbout = async(req,res) => {
    const about = await About.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!about) return res.status(404).json({msg: "Survey doesn't not exist" });
    const {aboutname} = req.body;
    
    try {
        await About.update({
            aboutname: aboutname
        }, {
            where: {
                id: about.id
            }
        });
        res.status(200).json({msg: "About updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const deleteAbout = async(req,res) => {
    const about = await About.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!about) return res.status(404).json({msg: "About doesn't not exist" });
    try {
        await About.destroy({
            where: {
                id: about.id
            }
        });
        res.status(201).json({msg: "About Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}