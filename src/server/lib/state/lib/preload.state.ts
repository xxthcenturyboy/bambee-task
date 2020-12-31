import { Request, Response } from 'express';
import User from 'server/models/User';
import UserEmail from 'server/models/Email';
import hashSession from 'server/lib/auth/hashSession';
import settings from 'settings';
import authenticateRequest from 'server/lib/auth/authenticateRequest';
import { getUserAndProfileStates } from './user.profile';
import * as I from 'shared/types/preload.interface';

export {
  setPreloadedState
};

//////////////////////////

// get user from db
async function _getUser(userId: string): Promise<User> {
  const doc = await User.findOne({
    where: {
      id: userId,
    },
    include: [
      UserEmail,
    ],
  });

  if (!doc) {
    throw Error(`No user found with ID: ${userId}`);
  }

  return doc;
}

async function setPreloadedState(req: Request, res: Response, csrfToken: any): Promise<I.PreloadedState> {
  try {

    let profile: I.ProfileState | {} = {};
    const isAuthenticated = await authenticateRequest(req, res);
    const userId = isAuthenticated && req.session && req.session.userId || null;
    const esId = userId || hashSession(req.session);

    if (userId) {
      const user = await _getUser(userId);

      if (user && isAuthenticated) {
        const userAndProfileStates = await getUserAndProfileStates(user, isAuthenticated);
        profile = userAndProfileStates;
      }
    }

    return {
      app: {
        esId,
        csrfToken,
        APP_HOST: settings.APP_HOST,
      },
      user: profile
    };
  } catch (err) {
    throw err;
  }
}
