
import { Sequelize } from "sequelize";
import db from '../config/Database.js';



const  {DataTypes} = Sequelize;

const SubCourse = db.define('subcourse', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    subcoursename:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
                }
    }
},{
    freezeTableName: true
})



export default SubCourse