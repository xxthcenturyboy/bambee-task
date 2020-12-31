import { Request, Response } from 'express';
import {
  sendOK,
  sendBadRequest
} from 'server/response';

import User from 'server/models/User';
import UserEmail from 'server/models/Email';
import { getUserAndProfileStates } from 'server/lib/state/';
import { createToken, createRefreshToken } from 'server/lib/auth/jwt';

export type Payload = {
  email: string;
  password: string;
};

export default async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body as Payload;
  try {
    const emailDoesNotExist = await UserEmail.isEmailAvailable(email);
    if (emailDoesNotExist) {
      return sendBadRequest(req, res, `This is not a valid username.`);
    }

    let user: User | null;
    try {
      // Attempt login
      user = await User.loginWithPassword(email, password);

      if (!user) {
        return sendBadRequest(req, res, 'Incorrect username or password.');
      }

    } catch (err) {
      return sendBadRequest(req, res, err);
    }

    req.session!.userId = user.id;
    res.cookie('token', createToken(user.id), { httpOnly: true });
    req.session!.refreshToken = createRefreshToken(user.id);

    const userAndProfileStates = await getUserAndProfileStates(user, true);

    sendOK(res, userAndProfileStates);

  } catch (err) {
    console.error(`Error in login handler: ${err.message}`);
    return sendBadRequest(req, res, 'Unknown error. Please contact support.');
  }
}
