import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import ClassType from "./ClassTypeModels.js";
import Language from "./LanguageModels.js";
import PriceType from "./PriceTypeModels.js";



const  {DataTypes} = Sequelize;

const Courses = db.define('courses', {
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
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fullprice:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fullduration:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    coursecode:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Code",
        validate: {
            notEmpty: false
        }
    },
},{
    freezeTableName: true
})


Courses.belongsTo(Language, {foreignKey: 'language_languageid'});

Courses.belongsTo(PriceType, {foreignKey: 'pricetype_pricetypeid'});

Courses.belongsTo(ClassType, {foreignKey: 'classtype_classtypeid'});




export default Courses