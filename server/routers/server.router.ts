import * as express from 'express';
import { Router as userRouter } from './user.router';

const router : express.Router = express.Router();

//... other routers

router.use('/', userRouter);

//... other paths

router.use('/api', router);

export { router };
