import ClassType from "../models/AcoomodationModels.js"
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import Accomodation from "../models/AcoomodationModels.js";

export const getAccomodations = async (req,res) => {
    try {
        const response = await Accomodation.findAll({
            attributes: ['uuid', 'id','accomodationname', 'accomodationprice', 'description']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const getAccomodationById = async(req,res) => {
    try {
        const response = await Accomodation.findOne({
            attributes: ['uuid', 'accomodationname','accomodationprice', 'description'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getAccomodationPrice = async(req,res) => {
    const {accoid} = req.body;

    try {
        const response = await Accomodation.findOne({
            attributes: ['id','accomodationprice', 'description'],
            where: {
                id: accoid
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createAccomodation = async(req,res) => {
    const {accomodationname, accomodationprice, description} = req.body;
    try {
        await Accomodation.create({
            accomodationname: accomodationname,
            accomodationprice: accomodationprice,
            description: description
        });
        res.status(201).json({msg: "Accomodation Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateAccomodation = async(req,res) => {
    const accomodation = await Accomodation.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!accomodation) return res.status(404).json({msg: "Accomodation doesn't not exist" });
    const {accomodationname, accomodationprice, description} = req.body;
    
    try {
        await Accomodation.update({
            accomodationname: accomodationname,
            accomodationprice: accomodationprice,
            description: description
        }, {
            where: {
                id: accomodation.id
            }
        });
        res.status(200).json({msg: "Accomodation  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const deleteAccomodation = async(req,res) => {
    const accomodation = await Accomodation.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!accomodation) return res.status(404).json({msg: "Accomodation doesn't not exist" });
    try {
        await Accomodation.destroy({
            where: {
                id: accomodation.id
            }
        });
        res.status(201).json({msg: "Accomodation Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}