import { Sequelize } from "sequelize";
import db from '../config/Database.js';




const  {DataTypes} = Sequelize;

const StudentsCourses = db.define('studentscourses', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    duration:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
     startdate:{
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    enddate:{
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    amount:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    details:{
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    }
},{
    freezeTableName: true
})




export default StudentsCourses