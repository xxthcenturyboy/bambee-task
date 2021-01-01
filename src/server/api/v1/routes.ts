import express from 'express';
import { endpointNotFound } from 'server/response';
import authRoutes from './auth/routes';
import userRoutes from './user/routes';
import taskRoutes from './task/routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/task', taskRoutes);

// route not found
router.all('/*', endpointNotFound);

export default router;
