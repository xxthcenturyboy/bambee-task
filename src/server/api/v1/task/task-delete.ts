import { Request, Response } from 'express';
import { Params } from 'shared/types/express';
import {
  sendOK,
  sendBadRequest
} from 'server/response';
import Task from 'server/models/Task';

interface DeleteParams extends Params {
  id: string;
}

export default async function taskDelete(req: Request, res: Response) {
  try {
    const { id: taskId } = req.params;

    if (!taskId) {
      throw new Error('No Task ID present.');
    }

    const [num, task] = await Task.markDeleted(taskId);

    sendOK(res, { num, task });

  } catch (err) {
    sendBadRequest(req, res, err);
  }
}
