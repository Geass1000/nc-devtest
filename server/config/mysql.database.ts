import { createPool, Pool } from 'mysql2/promise';
import { PoolOptions } from 'mysql2';

import { logger } from '../config/logger.config';
import { config } from './app.config';

logger.info(config.mysql.host, config.mysql.port, config.mysql.user, config.mysql.password, config.mysql.database);

export const mysqlPool : Pool = createPool(<PoolOptions>config.mysql);
