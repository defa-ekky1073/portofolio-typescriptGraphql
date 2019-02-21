import Sequelize from 'sequelize';
import config from '../config';
const { SEQUELIZE } = config;

// Create the connection
export const db = new Sequelize(SEQUELIZE.DB, SEQUELIZE.USERNAME, SEQUELIZE.PASSWORD, {
    host: SEQUELIZE.HOST,
    dialect: SEQUELIZE.DIALECT,
    port: SEQUELIZE.PORT,
    logging: SEQUELIZE.LOGGING
});