import Sequelize from 'sequelize';
import config from '../config';
import { functionLogger } from './index';
const { DATABASE } = config;

// Create the connection
export const db = new Sequelize(DATABASE.DB, DATABASE.USERNAME, DATABASE.PASSWORD, {
    host: DATABASE.HOST,
    dialect: DATABASE.DIALECT,
    port: DATABASE.PORT,
    logging: DATABASE.LOGGING
});
functionLogger.trace('===DB Connection===');
functionLogger.trace(db);
functionLogger.trace('===End of DB Connection===');