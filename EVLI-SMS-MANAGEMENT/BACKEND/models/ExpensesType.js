
import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const  {DataTypes} = Sequelize;

const ExpensesType = db.define('expensestype', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    expensestypename:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
},{
    freezeTableName: true
})
export default ExpensesType