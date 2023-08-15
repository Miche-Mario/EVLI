
import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Students from "./StudentsModels.js";

const  {DataTypes} = Sequelize;

const GroupDiscount = db.define('groupdiscount', {
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
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    },
    pourcentage:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    }
},{
    freezeTableName: true
})


export default GroupDiscount