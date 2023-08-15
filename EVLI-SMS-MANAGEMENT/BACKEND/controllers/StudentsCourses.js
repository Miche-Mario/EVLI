import StudentsCourses from "../models/StudentsCoursesModels.js"
import { Model, Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import Courses from "../models/CoursesModels.js";
import Students from "../models/StudentsModels.js";


export const getStudentsCourses = async (req,res) => {
    try {
        const response = await StudentsCourses.findAll({
            attributes: ['id','uuid', 'courses_coursesid', 'students_studentsid', 'duration'],
   
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
 
export const getProgram =async (req,res) => {
   
    try {
        const response = await Students.findOne({  
            where: {
                uuid: req.params.id
            }})

            const responsee = await StudentsCourses.findAll({  
            attributes: ['startdate', 'enddate', 'details'],
            where: {
                students_studentsid: response.id
            }, 
            include: [
                {model: Courses},
            ],
                
            
                 
          
        });
        res.status(200).json(responsee);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
