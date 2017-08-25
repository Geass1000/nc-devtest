import { logger } from '../config/logger.config';

export class AppError extends Error {
	public code : string;
	public statusCode : number;

	constructor (statusCode ?: number, message ?: string) {
		super(message);

		this.name = 'AppError';
		this.statusCode = statusCode || 500;
	}
}
