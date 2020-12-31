import { Request, Response } from 'express';
import moment from 'moment';
import {
  getToken,
  getRefreshToken,
  verifyToken,
  createToken,
  createRefreshToken
} from 'server/lib/auth/jwt';
import killCookie from './deadCookies';

export default async function isAuthenticated(req: Request, res: Response): Promise<boolean> {
  const userId = req.session && req.session.userId;

  // must have a userID on the session or else
  if (!userId) {
    return false;
  }

  try {
    const token = getToken(req);
    if (!token) {
      throw new Error('Could not get token from cookie.');
    }

    const tokenExp = verifyToken(token);
    if (!tokenExp) {
      killCookie(res);
      return false;
    }

    const nextExpire = moment().add(15, 'minutes').unix();

    if (tokenExp < nextExpire) {
      // Token will expire in short window
      // Check the refresh token
      const refreshToken = getRefreshToken(req);
      if (!refreshToken) {
        throw new Error('Could not get refresh token from session.');
      }

      const refreshExp = verifyToken(refreshToken);
      if (!refreshExp) {
        killCookie(res);
        return false;
      }

      if (refreshExp < nextExpire) {
        // Refresh token is expired
        killCookie(res);
        return false;
      }

      // Refresh is still valid
      // Reissue all tokens
      res.cookie('token', createToken(userId), { httpOnly: true });
      req.session!.refreshToken = createRefreshToken(userId);
    }

    // If we've made it this far...
    return true;

  } catch (err) {
    console.error(`Failed to authenticate tokens: ${err}`);
    killCookie(res);
    return false;
  }

}
