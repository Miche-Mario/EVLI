import { Sequelize } from "sequelize";
import db from '../config/Database.js';


const  {DataTypes} = Sequelize;

const Language = db.define('language', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    languagename:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
                }
    }
},{
    freezeTableName: true,
})

export default Language