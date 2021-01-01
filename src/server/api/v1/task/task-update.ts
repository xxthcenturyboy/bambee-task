import { Request, Response } from 'express';
import {
  sendOK,
  sendBadRequest
} from 'server/response';
import Task from 'server/models/Task';

type RequestBody = {
  id: string;
  name?: string;
  description?: string;
  dueDate?: string;
};

export default async function taskUpdate(req: Request, res: Response) {
  try {
    const { id, name, description, dueDate } = req.body as RequestBody;

    if (!id) {
      throw new Error('No Task ID present.');
    }

    if (!(name && description && dueDate)) {
      return sendOK(res, 'Nothing Updated.');
    }

    const task = await Task.updateTask(
      id,
      name,
      description,
      dueDate
    );

    sendOK(res, task);

  } catch (err) {
    sendBadRequest(req, res, err);
  }
}
