import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Courses from "./CoursesModels.js";
import SubCourse from "./SubCourseModels.js";

const  {DataTypes} = Sequelize;

const Course = db.define('course', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    coursename:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
                }
    }
},{
    freezeTableName: true,
})

Course.belongsToMany(SubCourse, { as: 'Subcourses', through: Courses, foreignKey: 'course_courseid' });
SubCourse.belongsToMany(Course, {  as: 'Courses', through: Courses, foreignKey: 'subcourse_subcourseid' });
Course.hasMany(Courses,{foreignKey: 'course_courseid' });
Courses.belongsTo(Course,{foreignKey: 'course_courseid' });
SubCourse.hasMany(Courses, {foreignKey: 'subcourse_subcourseid' });
Courses.belongsTo(SubCourse, {foreignKey: 'subcourse_subcourseid' });



export default Course