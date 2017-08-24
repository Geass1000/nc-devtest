import { pool } from '../config/mysql.database';
import { PoolConnection } from 'mysql2/promise';

import { logger } from '../config/logger.config';

export class UserModel {
	constructor () {
	}

	findUser (firstName : string) {
		let poolConn : PoolConnection;
		return pool.getConnection()
			.then((conn) => {
				logger.info(`${this.constructor.name} - findUser:`, 'Phase 1');
				poolConn = conn;
				return poolConn.query(`SELECT * FROM user WHERE firstName = '${firstName}'`);
			})
			.then((result) => {
				logger.info(`${this.constructor.name} - findUser:`, 'Phase 2');
				poolConn.release();
				return result[0];
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
