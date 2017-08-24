import * as express from 'express';

import { userController } from '../controllers/user.controller'

const router : express.Router = express.Router();

router.route('/users/:first_name')
	.get(userController.putUser.bind(userController));

//... other paths

module.exports = router;
