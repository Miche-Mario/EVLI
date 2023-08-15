import { Sequelize } from "sequelize";
import db from '../config/Database.js';



const  {DataTypes} = Sequelize;

const Purchase = db.define('purchases', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    purchasename:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
                }
    },
    purchaseprice:{
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








export default Purchase