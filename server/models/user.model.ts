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

	updateUser (firstName : string) {
		/* `UPDATE user SET  WHERE firstName = '${firstName}'` */
	}
}
