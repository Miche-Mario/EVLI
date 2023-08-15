import { Sequelize } from "sequelize";
import db from '../config/Database.js';


const  {DataTypes} = Sequelize;

const PriceType = db.define('pricetype', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    pricetypename:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
                }
    }
},{
    freezeTableName: true,
})

export default PriceType