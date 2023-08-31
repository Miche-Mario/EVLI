import { Sequelize } from "sequelize";


const db = new Sequelize('evlisms','root','azerty90', {
    dialect: "mysql"
});

export default db;