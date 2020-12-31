import { Request, Response, NextFunction } from 'express';
import authenticateRequest from './authenticateRequest';
import { sendUnauthorized } from 'server/response';

export default async function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
  // Ensure token is still valid
  try {
    const isAuthenticated = await authenticateRequest(req, res);

    if (!isAuthenticated) {
      return sendUnauthorized(req, res, 'Invalid token.');
    }

    next();
  } catch (err) {
    throw Error(err.message);
  }
}
