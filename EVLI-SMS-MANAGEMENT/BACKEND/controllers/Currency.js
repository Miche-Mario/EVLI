import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import Currency from "../models/CurrencyModels.js";

export const getCuurency = async (req,res) => {
    try {
        const response = await Currency.findAll({
            attributes: ['uuid', 'name','symbol', 'value']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getCurrencyById = async(req,res) => {
    try {
        const response = await Currency.findOne({
            attributes: ['uuid', 'name', 'symbol', 'value'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createCurency = async(req,res) => {
    const {name, symbol, value} = req.body;
    try {
        await Currency.create({
            name: name,
            symbol: symbol,
            value: value
        });
        res.status(201).json({msg: "Currency Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


export const updateCurrency = async(req,res) => {
    const currency = await Currency.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!currency) return res.status(404).json({msg: "Currency doesn't not exist" });
    const {name, symbol, value} = req.body;
    
    try {
        await Currency.update({
            name: name,
            symbol: symbol,
            value: value
        }, {
            where: {
                id: currency.id
            }
        });
        res.status(200).json({msg: "Currency  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const deleteCurrency = async(req,res) => {
    const curr = await Currency.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!curr) return res.status(404).json({msg: "Currency doesn't not exist" });
    try {
        await Currency.destroy({
            where: {
                id: curr.id
            }
        });
        res.status(201).json({msg: "Currency Deleted"});
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