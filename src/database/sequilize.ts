import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: process.env.user,
    password: process.env.password,
    database: process.env.database,
    logging: false
});

export default sequelize;
