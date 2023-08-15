import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Courses from "./CoursesModels.js";
import Times from "./TimeModels.js";



const  {DataTypes} = Sequelize;

const Prices = db.define('prices', {
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
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    }
},{
    freezeTableName: true
})





Courses.belongsToMany(Times, {as: "Times", through: Prices, foreignKey: "courses_coursesid"});
Times.belongsToMany(Courses, {as: "courses", through: Prices, foreignKey: "times_timesid"});
Courses.hasMany(Prices, {foreignKey: "courses_coursesid"});
Prices.belongsTo(Courses, {foreignKey: "courses_coursesid"});
Times.hasMany(Prices, {foreignKey: 'times_timesid'});
Prices.belongsTo(Times, {foreignKey: 'times_timesid'})


export default Prices