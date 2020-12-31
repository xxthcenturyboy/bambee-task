import jwt from 'jwt-simple';
import moment from 'moment';
import { Request } from 'express';
import settings from 'settings';

const { JWT_SECRET } = settings;
const issuer = 'accounts.advancedbasics.com';
const audience = 'advancedbasics.com';

export {
  getToken,
  getRefreshToken,
  createToken,
  createRefreshToken,
  verifyToken,
  getId,
};

export type Payload = {
  sub: string;
  exp: number;
  issuer: string;
  audience: string;
};

/////////////////////////////////

/*
* Creates a JWT
*/
function createToken(userId: string): string {
  const payload: Payload = {
    audience,
    issuer,
    sub: userId,
    exp: moment().add(1, 'hour').unix(),
  };
  return jwt.encode(payload, JWT_SECRET);
}

/*
* Creates a refresh token
*/
function createRefreshToken(userId: string): string {
  const payload: Payload = {
    audience,
    issuer,
    sub: userId,
    exp: moment().add(8, 'hours').unix(),
  };
  return jwt.encode(payload, JWT_SECRET);
}

/*
* Validates the Payload of the decoded token
*/
function isPayloadValid(payload: Payload): boolean {
  if (!payload) {
    return false;
  }

  if (!payload.sub) {
    return false;
  }

  if (!payload.issuer) {
    return false;
  }

  if (payload.issuer !== issuer) {
    return false;
  }

  if (!payload.audience) {
    return false;
  }

  if (payload.audience !== audience) {
    return false;
  }

  if (!payload.exp) {
    return false;
  }

  return true;
}

/*
* Verifies a JWT
*/
function verifyToken(token: string): number {
  try {
    const payload = jwt.decode(token, JWT_SECRET) as Payload;

    return isPayloadValid(payload) ? payload.exp : 0;
  } catch (err) {
    return 0;
  }
}

/*
* Retrieves the JWT from the cookie
*/
function getToken(req: Request): string {
  const token = req.cookies && req.cookies.token;
  return token || '';
}

/*
* Retrieves the JWT from the session
*/
function getRefreshToken(req: Request): string {
  const token = req.session && req.session.refreshToken;
  return token || '';
}

/*
* Retrieves the user ID from the JWT
*/
function getId(token: string): string {
  const payload = jwt.decode(token, JWT_SECRET) as Payload;
  return payload.sub;
}
