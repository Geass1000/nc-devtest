import * as express from 'express';

const router : express.Router = express.Router();

//... other routers

/*
 * API paths
 */

//... other paths

router.use('/api', router);

export { router };
