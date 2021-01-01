import { Request, Response } from 'express';
import {
  sendOK,
  sendBadRequest
} from 'server/response';
import Task from 'server/models/Task';

type RequestBody = {
  id: string;
};

export default async function taskComplete(req: Request, res: Response) {
  try {
    const { id: taskId } = req.body as RequestBody;
    if (!taskId) {
      throw new Error('No Task ID present.');
    }

    const [num, task] = await Task.markComplete(taskId);

    sendOK(res, { num, task });

  } catch (err) {
    sendBadRequest(req, res, err);
  }
}
