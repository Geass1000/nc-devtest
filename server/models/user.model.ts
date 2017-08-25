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

				if (result[0][0]) {
					return <IUser>result[0][0];
				} else {
					throw new AppError(null, 'User not found');
				}
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
			try {
				doc.image(new Buffer(user.image));
			} catch (error) {
				logger.error(error);
				reject(error); // Delete this row, if image isn't important
			}

			doc.end();
		});
	}

	/**
	 * Method update "pdf" field in the MySQL DB for user with first name equal the "firstName"
	 *
	 * @param {string} firstName - user first name
	 * @param {Buffer} pdf - buffer with the pdf file
	 * @return {Promise<void>}
	 */
	updateUserPDF (firstName : string, pdf : Buffer) : Promise<void> {
		const methodName : string = 'updateUser';

		const values : any = {
			pdf : pdf
		};

		let poolConn : PoolConnection;
		return this.pool.getConnection()
			.then((conn) => {
				logger.info(`${this.constructor.name} - ${methodName}:`, 'Phase 1');
				poolConn = conn;
				return poolConn.query(`UPDATE user SET ? WHERE firstName = '${firstName}'`, values);
			})
			.then((result) => {
				logger.info(`${this.constructor.name} - ${methodName}:`, 'Phase 2');
				poolConn.release();
			});
	}
}
