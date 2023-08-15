import { Sequelize } from "sequelize";
import db from '../config/Database.js';


const  {DataTypes} = Sequelize;

const Accomodation = db.define('accomodations', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    accomodationname:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
                }
    },
    accomodationprice:{
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


export default Accomodation