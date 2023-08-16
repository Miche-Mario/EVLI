
import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const  {DataTypes} = Sequelize;

const PaymentStatus = db.define('paymentstatus', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
},{
    freezeTableName: true
})
export default PaymentStatus 