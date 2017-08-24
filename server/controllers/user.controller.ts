import { BaseController } from '../lib/base-controller.class';

export class UserController extends BaseController {
	constructor () {
		super();
	}

	updateUser () : void {
	}
}

export const userController = new UserController();
