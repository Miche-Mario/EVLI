
import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Students from "./StudentsModels.js";

const  {DataTypes} = Sequelize;

const Discount = db.define('discount', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    code:{
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
    },
    used:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    }
},{
    freezeTableName: true
})

Discount.belongsTo(Students, {foreignKey: 'student_studentid'});

export default Discount