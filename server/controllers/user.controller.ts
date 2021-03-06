import * as express from 'express';

/* Configs */
import { logger } from '../config/logger.config';

/* Libs */
import { BaseController } from '../lib/base-controller.class';

/* Models */
import { userModel } from '../models/user.model';

export class UserController extends BaseController {
	constructor () {
		super();
	}

	/**
	 * Controller generate new PDF file for user with "first name" from route param
	 *
	 * @param {Request} req - request object
	 * @param {Response} res - response object
	 * @return {void}
	 */
	getUpdateUserPDF (req : express.Request, res : express.Response) : void {
		const methodName : string = 'getUpdateUserPDF';
		let message : string;

		const firstName : string = req.params['first_name'].toString().trim();

		userModel.findUser(firstName)
			.then((user) => {
				return userModel.generatePDF(user);
			})
			.then((pdf) => {
				return userModel.updateUserPDF(firstName, pdf);
			})
			.then(() => {
				message = 'PDF file was generated successfully'
				this.sendSuccessResponse(res, 200, { status : true }, methodName, message);
			})
			.catch((error) => {
				message = 'PDF file wasn\'t generated'
				this.sendErrorResponse(res, error, { status : false }, methodName, message);
			});
	}
}

export const userController = new UserController();
