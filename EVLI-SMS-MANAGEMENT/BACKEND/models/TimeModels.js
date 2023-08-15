import { Sequelize } from "sequelize";
import db from '../config/Database.js';


const  {DataTypes} = Sequelize;

const Times = db.define('times', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    time:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
                }
    }
},{
    freezeTableName: true
})


export default Times