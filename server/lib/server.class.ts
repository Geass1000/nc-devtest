'use strict';
import * as path from 'path';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as methodOverride from 'method-override';
import * as errorhandler from 'errorhandler';
import * as cors from 'cors';

import { logger } from '../config/logger.config';
import { router } from '../routers/server.router';
import { config } from '../config/app.config';

const srcStatic : string = `${__dirname}/../../../dist`;

/**
 * The server.
 *
 * @class Server
 */
export class Server {
	private app : express.Express;

	/**
	 * bootstrapServer - make new instance "Server" class
	 *
	 * @static
	 * @return {Server}  Return object server
	 */
	static bootstrapServer () : Server {
		return new Server();
	}

	constructor () {
		this.app = express();

		this.setConfig();

		this.setRoutes();

		this.startServer();
	}


	/**
	 * This function set middlewares and one create a connection to DB
	 *
	 * @method
	 *
	 * @return {void}
	 */
	setConfig () : void {
		const methodName = 'setConfig';

		logger.info('Configuring server...');
		if (config.env === 'development') {
			this.app.use(morgan('dev'));
		}

		// Parse body request to a json
		this.app.use(bodyParser.json());
		//this.app.use(bodyParser.urlencoded({ extended: true }));

		// Get default methods put and delete
		this.app.use(methodOverride());

		// Use CORS technology
		this.app.use(cors());

		// Set static files
		logger.info(`${this.constructor.name} - ${methodName}`, 'srcStatic', srcStatic);
		this.app.use(express.static(srcStatic));
	}

	/**
	 * This function set app routes (API and static)
	 *
	 * @method
	 *
	 * @return {void}
	 */
	setRoutes () : void  {
		logger.info('Setting routes...');

		this.app.use('/', router);
		this.app.get('/*', (req, res) => {
			res.sendFile(path.join(`${srcStatic}/index.html`));
		});
	}

	/**
	 * This function set error middlewares and one turn on the server
	 *
	 * @method
	 *
	 * @return {void}
	 */
	startServer () : void  {
		this.app.use(function(err, req, res, next) {
			if (err.name === 'StatusError') {
				res.send(err.status, err.message);
			} else {
				next(err);
			}
		});

		// Use ErrorHandler middleware
		if (config.env === 'development') {
			this.app.use(errorhandler());
		}

		logger.info('Starting server...');
		this.app.listen(config.express.port, function (err) {
			logger.info(`listening in http://localhost:${config.express.port}`);
		});
	}
}
