import { Request, Response } from 'express';
import {
  sendOK,
  sendBadRequest
} from 'server/response';
import Task from 'server/models/Task';

type RequestBody = {
  name?: string;
  description?: string;
  dueDate?: string;
};

export default async function taskCreate(req: Request, res: Response) {
  try {
    if (!(req.session && req.session.userId)) {
      throw new Error('User ID unavailable');
    }

    const { name, description, dueDate } = req.body as RequestBody;

    const task = await Task.createTask(
      req.session.userId,
      name,
      description,
      dueDate
    );

    sendOK(res, task);

  } catch (err) {
    sendBadRequest(req, res, err);
  }
}
