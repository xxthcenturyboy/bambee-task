import { Request, Response } from 'express';
import {
  sendOK,
  sendBadRequest
} from 'server/response';

import User from 'server/models/User';
import Email from 'server/models/Email';
import { getUserAndProfileStates } from 'server/lib/state/';
import zxcvbn from 'zxcvbn';
import { createToken, createRefreshToken } from 'server/lib/auth/jwt';

export type Device = {
  uniqueDeviceId: string;
  deviceId?: string;
  carrier?: string;
  deviceCountry?: string;
  name?: string;
  mulitSigPubKey: string;
};

export type Params = {
  email: string;
  password: string;
  passwordConfirm: string;
  recaptcha?: string;
  redirectUrl: string;
};

function returnInvalidEmail(req: Request, res: Response, email: string) {
  console.error(`Signup - Invalid Email: ${email}`);
  sendBadRequest(req, res, `${email} does not appear to be a valid email.`);
}

// tslint:disable-next-line
export default async function signupHandler(req: Request, res: Response) {
  const {
    email,
    password,
    passwordConfirm,
    recaptcha,
    redirectUrl,
  } = req.body as Params;

  if (!email) {
    return sendBadRequest(req, res, `Email is required`);
  }

  if (password !== passwordConfirm) {
    return sendBadRequest(req, res, 'Passwords must match');
  }

  if (!req.session) {
    return sendBadRequest(req, res, `Internal server error`);
  }

  // Check password strength
  const pwresult = zxcvbn(password);
  if (pwresult.score < 3) {
    return sendOK(res, {
      error: `Please choose a stronger password. ${
        pwresult.feedback && pwresult.feedback.warning && pwresult.feedback.warning || ''
        }`
    });
  }

  try {
    // const recaptchVerified = await recaptchaVerify(recaptcha);
    // if (!recaptchVerified) {
    //   return sendBadRequest(req, res, 'Invalid recaptcha');
    // }

    const isAvailable = await Email.isEmailAvailable(email);
    if (!isAvailable) {
      return sendBadRequest(req, res, `Email is already taken.`);
    }

    // validate this email prior to creating
    try {
      await Email.assertEmailIsValid(email);
    } catch (err) {
      return returnInvalidEmail(req, res, `${email} is invalid.`);
    }

    const user = await User.registerAndCreateFromEmail(email, password);

    if (!user) {
      throw Error(`Failed to create user using email ${email}`);
    }

    req.session.userId = user.id;
    res.cookie('token', createToken(user.id), { httpOnly: true });
    req.session!.refreshToken = createRefreshToken(user.id);

    const userAndProfileStates = await getUserAndProfileStates(user, true);

    if (!userAndProfileStates) {
      throw Error(`Failed to get state`);
    }

    return sendOK(res, userAndProfileStates);

  } catch (err) {
    console.error(`Error in signup handler: ${err.message}`);
    return sendBadRequest(req, res, 'Unknown error. Please contact support.');
  }
}
