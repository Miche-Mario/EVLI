import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Students from "./StudentsModels.js";
import Users from "./UsersModels.js";


const  {DataTypes} = Sequelize;

const Log = db.define('log', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    info:{
        type: DataTypes.STRING,
        allowNull: true
    },
   
},{
    freezeTableName: true
})


export default Log

Log.belongsTo(Users, {foreignKey: 'user_userid'});
