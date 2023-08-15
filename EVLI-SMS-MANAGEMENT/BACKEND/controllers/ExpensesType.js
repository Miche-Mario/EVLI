import ExpensesType from "../models/ExpensesType.js";
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"

export const getExpensesType = async (req,res) => {
    try {
        const response = await ExpensesType.findAll({
            attributes: ['id','uuid', 'expensestypename']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getExpensesTypeById = async(req, res) => {
    try {
        const response = await ExpensesType.findOne({
            attributes: ['uuid', 'expensestypename'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createExpensesType = async(req,res) => {
    const {expensestypename} = req.body;
    try {
        await ExpensesType.create({
            expensestypename: expensestypename
        });
        res.status(201).json({msg: "Expenses Type Successfully created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateExpensesType = async(req,res) => {
    const ext = await ExpensesType.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!ext) return res.status(404).json({msg: "Expenses Type doesn't not exist" });
    const {expensestypename} = req.body;
    
    try {
        await ExpensesType.update({
            expensestypename: expensestypename
        }, {
            where: {
                id: ext.id
            }
        });
        res.status(200).json({msg: "Expenses Type updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const deleteExpensesType = async(req,res) => {
    const expensestypename = await ExpensesType.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!expensestypename) return res.status(404).json({msg: "Expenses Type doesn't not exist" });
    try {
        await ExpensesType.destroy({
            where: {
                id: expensestypename.id
            }
        });
        res.status(201).json({msg: "Expenses Typeout Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}