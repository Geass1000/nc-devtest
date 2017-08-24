import * as express from 'express';

import { userController } from '../controllers/user.controller'

const router : express.Router = express.Router();

router.route('/users/:id')
	.get(userController.updateUser.bind(userController));

//... other paths

module.exports = router;
