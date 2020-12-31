import { Router } from 'express';
import { endpointNotFound } from 'server/response';
import ensureLoggedIn from 'server/lib/auth/ensureLoggedIn';

import profileHandler from './profile';

const router = Router();

router.all('/*', [ensureLoggedIn]);

router.get('/profile', profileHandler);

// route not found
router.all('/*', endpointNotFound);

export default router;
