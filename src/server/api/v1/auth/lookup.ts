import { Request, Response } from 'express';
import {
  sendOK,
  sendBadRequest
} from 'server/response';
import Email from 'server/models/Email';

type Payload = {
  email: string;
};

export default async function (req: Request, res: Response) {
  const { email } = req.body as Payload;

  try {
    const isAvailable = await Email.isEmailAvailable(email);

    if (!isAvailable) {
      return sendOK(res, { exists: true });
    }

    sendOK(res, { exists: false });

  } catch (err) {
    console.error(`Error in auth lookup handler: ${err.message}`);
    sendBadRequest(req, res, `Unknown error. Please contact support.`);
  }
}
