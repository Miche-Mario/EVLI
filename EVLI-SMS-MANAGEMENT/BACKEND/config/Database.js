import { Sequelize } from "sequelize";


const db = new Sequelize('evlisms','root','Lostoflove90&', {
    dialect: "mysql"
});

export default db;