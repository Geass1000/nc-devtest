import { Pool } from 'mysql2/promise';
import { PoolConnection } from 'mysql2/promise';

import { mysqlPool } from '../config/mysql.database';
import { logger } from '../config/logger.config';

import { IUser } from '../interfaces/user.interface';
export class UserModel {
	constructor (private pool : Pool) {
	}

	findUser (firstName : string) : Promise<any> {
		let poolConn : PoolConnection;
		return this.pool.getConnection()
			.then((conn) => {
				logger.info(`${this.constructor.name} - findUser:`, 'Phase 1');
				poolConn = conn;
				return poolConn.query(`SELECT * FROM user WHERE firstName = '${firstName}'`);
			})
			.then((result) => {
				logger.info(`${this.constructor.name} - findUser:`, 'Phase 2');
				poolConn.release();
				return result[0][0];
			});
	}

	generatePDF (user : IUser) : Promise<Buffer> {
		return new Promise((resolve, reject) => {
			const doc : PDFKit.PDFDocument = new PDFDocument();

			let body : string = '';
			doc.on('data', (chunk) => {
				body += chunk.toString();
			});
			doc.on('end', () => {
				const buff : Buffer = Buffer.from(body);
				resolve(buff);
			});
			doc.on('error', (error : Error) => {
				logger.error(`${error.name} - ${error.message}`);
				reject(error);
			});

			doc.text(`First Name: ${user.firstName}`);
			doc.text(`Last Name: ${user.lastName}`);
			doc.end();
		});
	}

	updateUser (firstName : string) : Promise<any> {
		/* `UPDATE user SET  WHERE firstName = '${firstName}'` */
		return Promise.resolve(null);
	}
}
