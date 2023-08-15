import StudentsAccomodations from "../models/StudentsAccomodationModels.js"
import { Model, Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"


export const getStudentsAccomodations = async (req,res) => {
    try {
        const response = await StudentsAccomodations.findAll({
            attributes: ['id', 'students_stuid', 'accos_accosid'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

/* export const getCoursesPrice =async (req,res) => {
    const {times_timesid, course_courseid, subcourse_subcourseid} = req.body;
    let responsee;
        if(subcourse_subcourseid == null) {
            responsee = await Courses.findOne({ 
                attributes: ['id'],
                where: {
                    course_courseid: course_courseid
                }, 
            
            });
        } else {
            responsee = await Courses.findOne({ 
                attributes: ['id'],
                where: {
                    course_courseid: course_courseid,
                    subcourse_subcourseid: subcourse_subcourseid
                }, 
            
            });
        }
    
        
        
        try {
            const response = await Prices.findOne({ 
                attributes: ['price'],
                where: {
                    courses_coursesid: responsee.id,
                    times_timesid: times_timesid
                }, 
            
            });
            
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}
 */
export const createStudentsAccomodations = async(req,res) => {
    const { students_stuid, accos_accosid} = req.body;
    try {
        await StudentsAccomodations.create({
            students_stuid: students_stuid,
            accos_accosid: accos_accosid
        });
        res.status(201).json({msg: "Student Accomodation Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateStudentsAccomodations = (req,res) => {
    
}
export const deleteStudentsAccomodations = (req,res) => {
    
}