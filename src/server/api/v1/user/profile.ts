import { Request, Response } from 'express';
import {
  sendOK,
  sendBadRequest
} from 'server/response';
import User from 'server/models/User';
import { getUserAndProfileStates } from 'server/lib/state/';

function emptyProfile(res: Response) {
  return sendOK(res, {
    profile: null
  });
}

export default async function profile(req: Request, res: Response) {
  try {
    if (!(req.session && req.session.userId)) {
      return emptyProfile(res);
    }

    const user = await User.findByPk(req.session.userId);

    if (!user) {
      return emptyProfile(res);
    }

    const userAndProfileStates = await getUserAndProfileStates(user, true);

    sendOK(res, userAndProfileStates);

  } catch (err) {
    sendBadRequest(req, res, err);
  }
}
