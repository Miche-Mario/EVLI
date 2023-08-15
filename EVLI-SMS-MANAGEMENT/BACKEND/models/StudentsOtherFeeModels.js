import { Sequelize } from "sequelize";
import db from '../config/Database.js';





const  {DataTypes} = Sequelize;

const StudentsOtherFee = db.define('studentotherfee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
},{
    freezeTableName: true
})







export default StudentsOtherFee