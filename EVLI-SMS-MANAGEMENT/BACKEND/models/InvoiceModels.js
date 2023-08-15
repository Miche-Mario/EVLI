
import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Discount from "./DiscountModels.js";
import Students from "./StudentsModels.js";

const  {DataTypes} = Sequelize;

const Invoice = db.define('invoice', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    invoicecode:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    },
    courselist:{
        type: DataTypes.JSON,
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    },
    examlist:{
        type: DataTypes.JSON,
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    },
    purchaselist:{
        type: DataTypes.JSON,
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    },
    accolist:{
        type: DataTypes.JSON,
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    },
    otherlist:{
        type: DataTypes.JSON,
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    },
    currency:{
        type: DataTypes.JSON,
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    },
    registration:{
        type: DataTypes.JSON,
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    },
    studdiscount:{
        type: DataTypes.JSON,
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    },
    discount:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    },
    total:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    },
    subtotal:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    },
    payed:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate:{
            notEmpty: false        
        }
    },


},{
    freezeTableName: true
})

Invoice.belongsTo(Students, {foreignKey: 'student_studentid'});


export default Invoice