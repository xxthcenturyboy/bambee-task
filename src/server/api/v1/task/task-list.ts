import { Request, Response } from 'express';
import { Params } from 'shared/types/express';
import {
  sendOK,
  sendBadRequest
} from 'server/response';
import Task from 'server/models/Task';
import { SortDirection } from 'shared/types/pagination';
import { TaskStatus, TaskPaginatonDefaults } from 'shared/types/tasks';

interface ListParams extends Params {
  status: string;
  sortField: string;
  sortDir: SortDirection;
  limit: string;
  offset: string;
}

type PaginationResponse = {
  count: number;
  rows: Task[]
};

export default async function taskDetail(req: Request, res: Response) {
  try {

    if (!(req.session && req.session.userId)) {
      throw new Error('User ID unavailable');
    }

    const status: string = req.params.status || TaskStatus.INCOMPLETE;
    const sortField: string = req.params.sortField || TaskPaginatonDefaults.sortField;
    const sortDir: SortDirection = req.params.sortDir as SortDirection || TaskPaginatonDefaults.sortDir;
    const limit: number = req.params.limit ? Number(req.params.limit) : TaskPaginatonDefaults.limit;
    const offset: number = req.params.offset ? Number(req.params.offset) : TaskPaginatonDefaults.offset;

    let list: PaginationResponse = {
      count: 0,
      rows: []
    };

    if (status === TaskStatus.COMPLETE) {
      list = await Task.findAllCompleteByUserIdPaginated(
        req.session.userId,
        sortField,
        sortDir,
        isNaN(limit) ? TaskPaginatonDefaults.limit : limit,
        isNaN(offset) ? TaskPaginatonDefaults.offset : offset
      );
    }

    if (status === TaskStatus.INCOMPLETE) {
      list = await Task.findAllIncompleteByUserIdPaginated(
        req.session.userId,
        sortField,
        sortDir,
        isNaN(limit) ? TaskPaginatonDefaults.limit : limit,
        isNaN(offset) ? TaskPaginatonDefaults.offset : offset
      );
    }

    sendOK(res, list);

  } catch (err) {
    sendBadRequest(req, res, err);
  }
}
