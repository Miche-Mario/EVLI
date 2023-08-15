import Course from "../models/CourseMoels.js"
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import Courses from "../models/CoursesModels.js";

export const getCourse = async (req,res) => {
    try {
        const response = await Courses.findAll({
            attributes: ['course_courseid'],
            include: {
                model: Course,
               
              },
               group: 'course_courseid',
              where: {
                active: true
              }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getCourseList = async (req,res) => {
    try {
        const response = await Course.findAll({
            attributes: ['id', 'uuid', 'coursename']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getCourseById = (req,res) => {
    
}
export const createCourse = async(req,res) => {
    const {coursename} = req.body;
    try {
        await Course.create({
            coursename: coursename
        });
        res.status(201).json({msg: "Course Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateAbout = (req,res) => {
    
}
export const deleteAbout = (req,res) => {
    
}