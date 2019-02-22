import * as bunyan from 'bunyan';
import config from '../config';
const { DEFAULT_LOG_LEVEL } = config;
let level;

// Set the log level, wheter using default from config files or argument
if (process.argv[2] == null || process.argv[2] === 'dist/server.js') {
    level = DEFAULT_LOG_LEVEL;
} else if (process.argv[2] === 'trace' || 'debug' || 'info' || 'warn' || 'error' || 'fatal' ) {
    console.log(`**Logging argument found, Log Level: ${process.argv[2]}**`);
    level = process.argv[2];
}

// create a logger with name function
export const functionLogger = bunyan.createLogger({
    name: 'Function',
    level: level
});

export const resolverLogger = bunyan.createLogger({
    name: 'Resolver',
    level: level
});

export const endpointLogger = bunyan.createLogger({
    name: 'Endpoint',
    level: level
});