import { Sequelize } from "sequelize";
import db from '../config/Database.js';


const  {DataTypes} = Sequelize;

const Exam = db.define('exams', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    examname:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
                }
    },
    examprice:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
},{
    freezeTableName: true
})


export default Exam