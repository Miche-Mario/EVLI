import Courses from "../models/CoursesModels.js"
import { Model, Sequelize, where } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import Course from "../models/CourseMoels.js";
import SubCourse from "../models/SubCourseModels.js";
import Language from "../models/LanguageModels.js";
import Prices from "../models/PricesModels.js";
import ClassType from "../models/ClassTypeModels.js";

export const getCourseWithSubcourse = async (req,res) => {
    const {  courseid} = req.body;
    let response, count;
   
    try {
             response = await Courses.findAll({
               attributes: ['id'],
               include: {
                model: SubCourse,
               
              },
              where: {
                course_courseid: courseid,
                active: true
              }
           }); 
           
           res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    
    }

    export const getCoursesPrice = async (req,res) => {
        const {  courseid, subcourseid, duration} = req.body;
        let courses;
        let coursesidd;
        if(courseid !== null && subcourseid !== null) {
            courses = await Courses.findOne({
               
                where: {
                course_courseid: courseid,
                subcourse_subcourseid: subcourseid
            }
        })
        }

        if(courseid !== null && subcourseid == null) {
            courses = await Courses.findOne({
               
                where: {
                course_courseid: courseid
            }
        })
        }
        

        if(!courses) return res.status(404).json({msg: "Courses doesn't not exist" });


            if (courses.fullprice > 0)  {
                const fullprice = courses.fullprice

                coursesidd = courses.id
                try {
                    const response = await Courses.findOne({
                        attributes: ['id','fullduration', 'fullprice', 'description'],
                       where: {
                        course_courseid: courseid,
                        subcourse_subcourseid: subcourseid
                       }
                    }); 
                    
                    res.status(200).json({response, fullprice, coursesidd});
                } catch (error) {
                    res.status(500).json({msg: error.message});
                }
            } if(courses.fullprice == 0 ) {
                const description = courses.description
                coursesidd = courses.id
                try {

                    const response = await Prices.findOne({
                        attributes: ['id','price'],
                       where: {
                         courses_coursesid: courses.id,
                         times_timesid: duration
                       }
                    }); 
                    
                    res.status(200).json({response, description, coursesidd});
                } catch (error) {
                    res.status(500).json({msg: error.message});
                }
                
            }
               
           
        
        }


export const getCourses = async (req,res) => {
    const {  language, classtype, active} = req.body;
    let response, count;
   
    try {
        
  
           if(language == "" && classtype == ""  && active == "" ) { 
        
            count, response = await Courses.findAndCountAll({
               attributes: ['id','uuid','language_languageid','fullprice','coursecode','fullduration','pricetype_pricetypeid', 'active', 'course_courseid', 'description', 'subcourse_subcourseid'],
               include: [
                   {model: Course},
                   {model: Language},
                   {model: SubCourse},
                   {model: ClassType}
              ]
           });}

           
           if(language === "" && classtype === "" && active !== "" ) { 
        
            response = await Courses.findAndCountAll({
               attributes: ['id','uuid','language_languageid','fullprice','coursecode','fullduration','pricetype_pricetypeid', 'active', 'course_courseid', 'description', 'subcourse_subcourseid'],
               include: [
                   {model: Course},
                   {model: Language},
                   {model: SubCourse},
                   {model: ClassType}
              ],
              where: {
                active: active
              }
           });}


           if(language !== "" && classtype == "" && active == "" ) { 
        
            response = await Courses.findAndCountAll({
               attributes: ['id','uuid','language_languageid','fullprice','coursecode','fullduration','pricetype_pricetypeid', 'active', 'course_courseid', 'description', 'subcourse_subcourseid'],
               include: [
                   {model: Course},
                   {model: Language},
                   {model: SubCourse},
                   {model: ClassType}
              ],
              where: {
                language_languageid: language
              }
           });}

           if(language == "" && classtype !== "" && active == "" ) { 
        
            response = await Courses.findAndCountAll({
               attributes: ['id','uuid','language_languageid','fullprice','coursecode','fullduration','pricetype_pricetypeid', 'active', 'course_courseid', 'description', 'subcourse_subcourseid'],
               include: [
                   {model: Course},
                   {model: Language},
                   {model: SubCourse},
                   {model: ClassType}
              ],
              where: {
                classtype_classtypeid: classtype
              }
           });}

           if(language !== "" && classtype !== "" && active == "" ) { 
        
            response = await Courses.findAndCountAll({
               attributes: ['id','uuid','language_languageid','fullprice','coursecode','fullduration','pricetype_pricetypeid', 'active', 'course_courseid', 'description', 'subcourse_subcourseid'],
               include: [
                   {model: Course},
                   {model: Language},
                   {model: SubCourse},
                   {model: ClassType}
              ],
              where: {
                [Op.and] : [
                    {classtype_classtypeid: classtype},
                    {language_languageid: language},

                ]
              }
           });}
           if(language !== "" && classtype == "" && active !== "" ) { 
        
            response = await Courses.findAndCountAll({
               attributes: ['id','uuid','language_languageid','fullprice','coursecode','fullduration','pricetype_pricetypeid', 'active', 'course_courseid', 'description', 'subcourse_subcourseid'],
               include: [
                   {model: Course},
                   {model: Language},
                   {model: SubCourse},
                   {model: ClassType}
              ],
              where: {
                [Op.and] : [
                    {active: active},
                    {language_languageid: language},

                ]
              }
           });}
           if(language == "" && classtype !== "" && active !== "" ) { 
        
            response = await Courses.findAndCountAll({
               attributes: ['id','uuid','language_languageid','fullprice','coursecode','fullduration','pricetype_pricetypeid', 'active', 'course_courseid', 'description', 'subcourse_subcourseid'],
               include: [
                   {model: Course},
                   {model: Language},
                   {model: SubCourse},
                   {model: ClassType}
              ],
              where: {
                [Op.and] : [
                    {classtype_classtypeid: classtype},
                    {active: active},

                ]
              }
           });}
           if(language !== "" && classtype !== "" && active !== "" ) { 
        
            response = await Courses.findAndCountAll({
               attributes: ['id','uuid','language_languageid','fullprice','coursecode','fullduration','pricetype_pricetypeid', 'active', 'course_courseid', 'description', 'subcourse_subcourseid'],
               include: [
                   {model: Course},
                   {model: Language},
                   {model: SubCourse},
                   {model: ClassType}
              ],
              where: {
                [Op.and] : [
                    {classtype_classtypeid: classtype},
                    {language_languageid: language},
                    {active: active},
                ]
              }
           });}
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}


export const getCoursesById =async (req,res) => {
    try {
        const response = await Courses.findOne({  
            where: {
                id: req.params.id
            }, 
            include: [
                {model: Course},
                {model: Language},
                {model: SubCourse},
                {model: ClassType}
           ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}




 export const createCourses = async(req,res) => {
    const { courseidd,coursename,subcoursename,language_languageid, classtype_classtypeid, pricetype_pricetypeid, description, fullduration, fullprice} = req.body;
    let subcourse;
    let course;
    let coursess;

    if(coursename){
         course = await  Course.create({
            coursename: coursename
        });
    }
  

        if(subcoursename){

         subcourse = await SubCourse.create({
            subcoursename: subcoursename
        });}
   


        
           coursess = await Courses.create({
                    active: true,
                    course_courseid: coursename ? course.id : courseidd ,
                    subcourse_subcourseid: subcoursename ? subcourse.id : null,
                    description: description,
                    classtype_classtypeid: classtype_classtypeid,
                    fullduration: fullduration,
                    fullprice: fullprice != 0 ? fullprice : 0,
                    language_languageid: language_languageid
                });
        
              const { times, prices} = req.body;


const dataFinal = await times.map((time,index) => {
  
    let dataa = {
      "times_timesid": time.id,
      "price": prices[index] ? prices[index] : null ,
      "courses_coursesid": coursess.id
    }
    return dataa
})
 
                  Prices.bulkCreate(dataFinal, { validate: true })
}

export const updateCourses = async (req, res) => {
    const courses = await Courses.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!courses) return res.status(404).json({ msg: "Courses doesn't not exist" });
    const { courseid, coursename, subcourseid, subcoursename,
        description, fullprice, fullduration,
        language_languageid, classtype_classtypeid, active } = req.body;


    await Course.update({
        coursename: coursename,
    }, {
        where: {
            id: courseid
        }
    });

    subcoursename !== "" && await SubCourse.update({
        subcoursename: subcoursename,
    }, {
        where: {
            id: subcourseid
        }
    });

    await Courses.update({
        description: description,
        fullprice: fullprice,
        fullduration: fullduration,
        language_languageid: language_languageid,
        classtype_classtypeid: classtype_classtypeid,
        description: description,
        active: active
    }, {
        where: {
            id: req.params.id,

        }
    })


        try {
            await Prices.destroy({
                where: {
                    courses_coursesid: req.params.id
                }
            });
            res.status(201).json({ msg: "Courses Deleted" });
        } catch (error) {
            res.status(400).json({ msg: error.message })
        }


        const { times, prices } = req.body;


        const dataFinal = await times.map((time, index) => {

            let dataa = {
                "times_timesid": time.id,
                "price": prices[index] ? prices[index] : null,
                "courses_coursesid": req.params.id
            }
            return dataa
        })

        Prices.bulkCreate(dataFinal, { validate: true })
    }


export const deleteCourses = async(req,res) => {
    const courses = await Courses.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!courses) return res.status(404).json({msg: "Courses Type doesn't not exist" });
    try {
        await Courses.destroy({
            where: {
                id: courses.id
            }
        });
        res.status(201).json({msg: "Courses Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}