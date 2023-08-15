import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import Registration from "../models/RegistrationModels.js";

export const getRegistration = async (req,res) => {
    try {
        const response = await Registration.findAll({
            attributes: ['uuid', 'id','registrationname', 'registrationprice']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



export const createRegistration = async(req,res) => {
    const {registrationname, registrationprice} = req.body;
    try {
        await Registration.create({
            registrationname: registrationname,
            registrationprice: registrationprice
        });
        res.status(201).json({msg: "Registration Fee Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateRegistration = async(req,res) => {
    const registration = await Registration.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!registration) return res.status(404).json({msg: "Registration Fee doesn't not exist" });
    const {registrationname, registrationprice} = req.body;
    
    try {
        await Registration.update({
            registrationname: registrationname,
            registrationprice: registrationprice
        }, {
            where: {
                id: registration.id
            }
        });
        res.status(200).json({msg: "Registration fee  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const deleteRegistration = async(req,res) => {
    const registration = await Registration.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!registration) return res.status(404).json({msg: "Registration doesn't not exist" });
    try {
        await Registration.destroy({
            where: {
                id: registration.id
            }
        });
        res.status(201).json({msg: "Registration fee Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}