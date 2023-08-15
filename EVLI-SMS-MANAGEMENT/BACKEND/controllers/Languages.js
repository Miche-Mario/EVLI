import Language from "../models/LanguageModels.js"
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"

export const getLanguage = async (req,res) => {
    try {
        const response = await Language.findAll({
            attributes: ['uuid', 'id','languagename']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getLanguageById = async(req,res) => {
    try {
        const response = await Language.findOne({
            attributes: ['uuid', 'languagename'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createLanguage = async(req,res) => {
    const {languagename} = req.body;
    try {
        await Language.create({
            languagename: languagename
        });
        res.status(201).json({msg: "Language Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateLanguage = async(req,res) => {
    const language = await Language.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!language) return res.status(404).json({msg: "Language doesn't not exist" });
    const {languagename} = req.body;
    
    try {
        await Language.update({
            languagename: languagename,
        }, {
            where: {
                id: language.id
            }
        });
        res.status(200).json({msg: "Language  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const deleteLanguage = async(req,res) => {
    const language = await Language.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!language) return res.status(404).json({msg: "Language doesn't not exist" });
    try {
        await Language.destroy({
            where: {
                id: language.id
            }
        });
        res.status(201).json({msg: "Language Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}