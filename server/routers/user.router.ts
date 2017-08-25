import * as express from 'express';

import { userController } from '../controllers/user.controller'

const router : express.Router = express.Router();

router.route('/user/:first_name')
	.get(userController.getUpdateUserPDF.bind(userController));

//... other paths

export { router };
