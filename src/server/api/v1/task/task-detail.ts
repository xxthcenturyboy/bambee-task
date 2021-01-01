import { Request, Response } from 'express';
import { Params } from 'shared/types/express';
import {
  sendOK,
  sendBadRequest
} from 'server/response';
import Task from 'server/models/Task';

interface DetailParams extends Params {
  id: string;
}

export default async function taskDetail(req: Request, res: Response) {
  try {
    const { id: taskId } = req.params;

    const task = await Task.findTaskById(taskId);

    sendOK(res, task);

  } catch (err) {
    sendBadRequest(req, res, err);
  }
}
