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
config.mongodb = {
	username : process.env.MONGODB_USERNAME,
	password : process.env.MONGODB_PASSWORD,
	host : process.env.MONGODB_HOST,
	port : process.env.MONGODB_PORT,
	database : process.env.MONGODB_DATABASE
};

//... crypto
config.crypto = {
	salt : process.env.CRYPTO_SALT || null,
	secret : process.env.CRYPTO_SECRET || null
};

export { config };
