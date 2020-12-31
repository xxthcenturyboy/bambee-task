import express from 'express';
import { endpointNotFound } from 'server/response';
import authRoutes from './auth/routes';
import userRoutes from './user/routes';

const router = express.Router();

// auth
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

// route not found
router.all('/*', endpointNotFound);

export default router;
