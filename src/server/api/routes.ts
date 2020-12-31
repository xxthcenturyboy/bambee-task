import { Router } from 'express';
import { endpointNotFound } from 'server/response';
import v1Routes from './v1/routes';

const router = Router();

// auth
router.use('/v1', v1Routes);

// route not found
router.all('/*', endpointNotFound);

export default router;
