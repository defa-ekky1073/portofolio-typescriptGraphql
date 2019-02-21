import * as bunyan from 'bunyan';
import config from '../config';
const { LOG_LEVEL } = config;

// create a logger with name function
export const functionLogger = bunyan.createLogger({
    name: 'Function',
    level: LOG_LEVEL
});