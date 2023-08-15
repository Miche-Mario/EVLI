
import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const  {DataTypes} = Sequelize;

const AccoDiscount = db.define('accodiscount', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    from:{
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


export default AccoDiscount