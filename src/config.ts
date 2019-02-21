import * as rc from 'rc';
import * as process from 'process';
import { join, dirname, resolve } from 'path';
import { existsSync, readFileSync, readFile } from 'fs';
import { LogLevel } from 'bunyan';

/**
 * Interface for config
 */
export interface Config {
    APP_PORT: number;
    SEQUELIZE: {
        HOST: string;
        PORT: number;
        DB: string;
        USERNAME: string;
        PASSWORD: string;
        DIALECT: string;
        LOGGING: boolean;
    };
    LOG_LEVEL: LogLevel;
    LOCALHOST: string;
    SECRET: string;
}

// Setting default config in case .json config doesn't exist
export const configDefault: Config = {
    APP_PORT: 5000,
    SEQUELIZE: {
        HOST: '127.0.0.1',
        PORT: 3306,
        DB: 'portofolio',
        USERNAME: 'root',
        PASSWORD: '',
        DIALECT: 'mysql',
        LOGGING: false
    },
    LOG_LEVEL: 'fatal',
    LOCALHOST: '127.0.0.1',
    SECRET: 'rahasia'
};

/**
 * Read configuration for binary packaged build
 * configuration must be placed in JSON format with 'portofolio.config.json' filename
 * File must be placed in the same directory with distributed binary file ('portofolio-api')
 */
function readLocalConfig(): Config {
    const configPath = join(dirname(process.execPath), 'portofolio.config.json');
    try {
        if (!existsSync(configPath)) {
            return configDefault;
        }
        const raw = readFileSync(configPath, 'utf8');
        const configLocal = JSON.parse(raw);
        return Object.assign<any, Config, Config>({}, configDefault, configLocal);
    } catch (e) {
        return configDefault;
    }
}

const config: Config = process['pkg'] ?
    readLocalConfig() :
    rc<Config>('portofolio', configDefault);

export default config;