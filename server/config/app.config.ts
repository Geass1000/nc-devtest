import * as dotenv from 'dotenv';

/* Classes and Interfaces */
import { logger } from '../config/logger.config';

import { IAppConfig } from '../interfaces/app.config.interface';
import { Helper } from '../lib/helper.class';

const config : IAppConfig = {};

if (process.env.NODE_ENV !== 'production') {
	const pathEnv : string = `${__dirname}/../../../.env`;
	dotenv.config({ path: pathEnv });
	logger.info(`Path to .env file: ${pathEnv}`);
	config.env = 'development';
} else {
	config.env = 'production';
}

//... express
config.express = {
	port : +process.env.PORT || 5000
};

//... database
// MySQL
config.mysql = {
	connectionLimit : Helper.isNumber(process.env.MYSQL_CLIMIT, 10, 1),
	host : process.env.MYSQL_HOST,
	port : Helper.isNumber(process.env.MYSQL_PORT, 3306, 0),
	user : process.env.MYSQL_USER,
	password : process.env.MYSQL_PASSWORD,
	database : process.env.MYSQL_DATABASE
};

//... crypto
config.crypto = {
	salt : process.env.CRYPTO_SALT || null,
	secret : process.env.CRYPTO_SECRET || null
};

export { config };
