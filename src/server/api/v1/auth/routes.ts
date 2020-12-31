import { Router } from 'express';
import { endpointNotFound } from 'server/response';

import loginHandler from './login';
import signupHandler from './signup';
import authLookupHandler from './lookup';
import logoutHandler from './logout';

const router = Router();

router.post('/lookup', authLookupHandler);
router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.post('/logout', logoutHandler);

// route not found
router.all('/*', endpointNotFound);

export default router;
