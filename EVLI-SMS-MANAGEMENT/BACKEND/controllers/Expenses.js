import Expenses from "../models/Expenses.js";
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import ExpensesType from "../models/ExpensesType.js";
import Log from "../models/LogModels.js";


export const getAllExpensesInTwoDates = async (req,res) => {
    const {startDate, endDate} = req.body;

    try {
        const response = await Expenses.findAll({
            attributes: ['uuid', 'id','date', 'amount', 'description'],
            include: {
                model: ExpensesType
              },
              where: {
                date: {
                    [Op.between] : [startDate, endDate]
                }
              }
            
        });

        const amount = response.map((item, index) => {

            let dataa = {
                "amount": item.amount
            }
            return dataa
        })

      let newresponse = [...response, amount]


        res.status(200).json(newresponse);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const getExpensesById = async(req,res) => {
    try {
        const response = await Expenses.findOne({
            attributes: ['uuid', 'id','date', 'amount', 'description',],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const createExpenses = async(req,res) => {
    const {date, amount, description, exptype, info, user} = req.body;
    try {
        await Expenses.create({
            date: date,
            amount: amount,
            description: description,
            exptype: exptype
        });




      ////////////////////////ADDD LOG////////////////////////
      const expp = await ExpensesType.findOne({
        where: {
            id: exptype
        }
    });
      await Log.create({
        info: `Add expenses - Expenses Type: ${expp.expensestypename} Amount: ${amount} - Description: ${description}`,
        user_userid: user
    });
      //////////////////////////////////////////////////////////
        res.status(201).json({msg: "Expennses Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
        
    }
}
export const updateExpenses = async(req,res) => {
    const exp = await Expenses.findOne({
        where: {
            uuid: req.params.id
        }
    });

    const oldAmount = exp.amount
    if(!exp) return res.status(404).json({msg: "Expenses doesn't not exist" });
    const {date, amount, description, exptype, user} = req.body;
    
    try {
        await Expenses.update({
            date: date,
            amount: amount,
            description: description,
            exptype: exptype
        }, {
            where: {
                id: exp.id
            }
        });



         ////////////////////////ADDD LOG////////////////////////
      const expp = await ExpensesType.findOne({
        where: {
            id: exptype
        }
    });
      await Log.create({
        info: `Update expenses - Expenses Type: ${expp.expensestypename} First Amount: ${oldAmount} - New Amount: ${amount} - Description: ${description}`,
        user_userid: user
    });
    console.log(expp);
      //////////////////////////////////////////////////////////

        res.status(200).json({msg: "Expenses updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const deleteExpenses= async(req,res) => {
    const {user} = req.body;

    const exp = await Expenses.findOne({
        where: {
            uuid: req.params.id
        }
    });
    const newiid = exp.exptype
    const amount = exp.amount
    const description = exp.description
    if(!exp) return res.status(404).json({msg: "Expenses doesn't not exist" });
    try {
        await Expenses.destroy({
            where: {
                id: exp.id
            }
        });


    ////////////////////////ADDD LOG////////////////////////
      const expp = await ExpensesType.findOne({
        where: {
            id: newiid
        }
    });
      await Log.create({
        info: `Delete expenses - Expenses Type: ${expp.expensestypename} Amount: ${amount} - Description: ${description}`,
        user_userid: user
    });
      //////////////////////////////////////////////////////////


        res.status(201).json({msg: "Expenses Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}