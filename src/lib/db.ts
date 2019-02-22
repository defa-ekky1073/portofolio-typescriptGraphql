import Sequelize from 'sequelize';
import config from '../config';
import { functionLogger } from './index';
const { SEQUELIZE } = config;

// Create the connection
export const db = new Sequelize(SEQUELIZE.DB, SEQUELIZE.USERNAME, SEQUELIZE.PASSWORD, {
    host: SEQUELIZE.HOST,
    dialect: SEQUELIZE.DIALECT,
    port: SEQUELIZE.PORT,
    logging: SEQUELIZE.LOGGING
});
functionLogger.trace('===DB Connection===');
functionLogger.trace(db);
functionLogger.trace('===End of DB Connection===');