import { Response } from 'express';

export default function killCookie(res: Response) {
  res.cookie('token', 'none', { httpOnly: true, expires: new Date(Date.now() + 5 * 1000) });
}
