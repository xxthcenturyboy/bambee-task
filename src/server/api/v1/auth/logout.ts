import { Request, Response } from 'express';
import { sendBadRequest } from 'server/response';
import killCookie from 'server/lib/auth/deadCookies';

export default function logout(req: Request, res: Response) {
  req.session!.destroy((err) => {
    if (err) {
      return sendBadRequest(req, res, err);
    }
    console.log('session destroyed');
    killCookie(res);
    res.redirect('/');
  });
}
