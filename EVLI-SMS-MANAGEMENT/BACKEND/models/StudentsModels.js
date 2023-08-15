import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import About from "./AboutModels.js";


const  {DataTypes} = Sequelize;

const Students = db.define('students', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    studentid:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "EVLI",
    },
    surnameg:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    forenamesg:{
        type: DataTypes.STRING,
        allowNull: true
    },
    genderg:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    dateofbirthg:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    placeofbirthg:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    citizenshipg:{
        type: DataTypes.STRING,
        allowNull: true
    },
    occupationg:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    emailg:{
        type: DataTypes.STRING,
        allowNull: true,
       
    },
    telhomeg:{
        type: DataTypes.STRING,
        allowNull: true,
        
    },
    telghanag:{
        type: DataTypes.STRING,
        allowNull: true,
      
    },
    addresshomeg:{
        type: DataTypes.STRING,
        allowNull: true,
       
    },
    addressghanag:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    maritalg:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    passportidg:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    academicg:{
        type: DataTypes.STRING,
        allowNull: true
    },
    noteg:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    passportphotographg:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false
        },
        required: false
    },
    idscang:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false
        },
        required: false
    },
    surnamee:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    forenamese:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    gendere:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    relationshipe:{
        type: DataTypes.STRING,
        allowNull: true
    },
    occupatione:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    emaile:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    tel1e:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    tel2e:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    addresse:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    surnamep:{
        type: DataTypes.STRING,
        allowNull: true
    },
    forenamesp:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    genderp:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    relationshipp:{
        type: DataTypes.STRING,
        allowNull: true
    },
    occupationp:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    emailp:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    tel1p:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    tel2p:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    addressp:{
        type: DataTypes.STRING,
        allowNull: true
    },
    nameo:{
        type: DataTypes.STRING,
        allowNull: true
    },
    addresso:{
        type: DataTypes.STRING,
        allowNull: true
    },
    tel1o:{
        type: DataTypes.STRING,
        allowNull: true
    },
    emailo:{
        type: DataTypes.STRING,
        allowNull: true
    },
    contacto:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    tel2o:{
        type: DataTypes.STRING,
        allowNull: true
    },
    isstudent:{
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    startdate:{
        type: DataTypes.STRING,
        allowNull: true
    },
    enddate:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    
},{
    freezeTableName: true
})

Students.belongsTo(About, {foreignKey: 'about_aboutid'});



export default Students  

