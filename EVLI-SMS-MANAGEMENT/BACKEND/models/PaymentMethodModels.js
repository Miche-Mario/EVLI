import { Sequelize } from "sequelize";
import db from '../config/Database.js';


const  {DataTypes} = Sequelize;

const PaymentMethods = db.define('paymentmethods', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    paymentname:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
                }
    }
},{
    freezeTableName: true,
})

export default PaymentMethods