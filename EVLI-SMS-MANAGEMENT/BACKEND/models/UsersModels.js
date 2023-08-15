import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Accomodation from "./AcoomodationModels.js";
import Courses from "./CoursesModels.js";
import Exam from "./ExamModels.js";
import Purchase from "./PurchasesModels.js";
import StudentsAccomodations from "./StudentsAccomodationModels.js";
import StudentsCourses from "./StudentsCoursesModels.js";
import StudentsExams from "./StudentsExamsModels.js";
import Students from "./StudentsModels.js";
import StudentsPurchases from "./StudentsPurchasesModels.js";
import OtherFee from "./OtherFeeModels.js"
import StudentsOtherFee from "./StudentsOtherFeeModels.js";

const  {DataTypes} = Sequelize;

const Users = db.define('users', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    }
},{
    freezeTableName: true
})




Students.belongsToMany(Courses, { as: 'Coursess', through: StudentsCourses, foreignKey: 'students_studentsid' });
Courses.belongsToMany(Students, {  as: 'Studentss', through: StudentsCourses, foreignKey: 'courses_coursesid' });
Students.hasMany(StudentsCourses,{foreignKey: 'students_studentsid' });
StudentsCourses.belongsTo(Students,{foreignKey: 'students_studentsid' });
Courses.hasMany(StudentsCourses, {foreignKey: 'courses_coursesid' });
StudentsCourses.belongsTo(Courses, {foreignKey: 'courses_coursesid' });



Students.belongsToMany(Purchase, { as: 'Purchasess', through: StudentsPurchases, foreignKey: 'students_stuid' });
Purchase.belongsToMany(Students, {  as: 'Studentss', through: StudentsPurchases, foreignKey: 'purchases_purid' });
Students.hasMany(StudentsPurchases,{foreignKey: 'students_stuid' });
StudentsPurchases.belongsTo(Students,{foreignKey: 'students_stuid' });
Purchase.hasMany(StudentsPurchases, {foreignKey: 'purchases_purid' });
StudentsPurchases.belongsTo(Purchase, {foreignKey: 'purchases_purid' });

Students.belongsToMany(Accomodation, { as: 'Accos', through: StudentsAccomodations, foreignKey: 'students_stuid' });
Accomodation.belongsToMany(Students, {  as: 'Studentss', through: StudentsAccomodations, foreignKey: 'accos_accosid' });
Students.hasMany(StudentsAccomodations,{foreignKey: 'students_stuid' });
StudentsAccomodations.belongsTo(Students,{foreignKey: 'students_stuid' });
Accomodation.hasMany(StudentsAccomodations, {foreignKey: 'accos_accosid' });
StudentsAccomodations.belongsTo(Accomodation, {foreignKey: 'accos_accosid' });

Students.belongsToMany(Exam, { as: 'Exams', through: StudentsExams, foreignKey: 'students_stuid' });
Exam.belongsToMany(Students, {  as: 'Studentss', through: StudentsExams, foreignKey: 'exams_examsid' });
Students.hasMany(StudentsExams,{foreignKey: 'students_stuid' });
StudentsExams.belongsTo(Students,{foreignKey: 'students_stuid' });
Exam.hasMany(StudentsExams, {foreignKey: 'exams_examsid' });
StudentsExams.belongsTo(Exam, {foreignKey: 'exams_examsid' });

Students.belongsToMany(OtherFee, { as: 'Otherfees', through: StudentsOtherFee, foreignKey: 'students_stuid' });
OtherFee.belongsToMany(Students, {  as: 'Studentss', through: StudentsOtherFee, foreignKey: 'otherfee_otherfeeid' });
Students.hasMany(StudentsOtherFee,{foreignKey: 'students_stuid' });
StudentsOtherFee.belongsTo(Students,{foreignKey: 'students_stuid' });
OtherFee.hasMany(StudentsOtherFee, {foreignKey: 'otherfee_otherfeeid' });
StudentsOtherFee.belongsTo(OtherFee, {foreignKey: 'otherfee_otherfeeid' });


export default Users