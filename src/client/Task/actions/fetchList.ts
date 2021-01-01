import { createAsyncAction } from 'typesafe-actions';
import { Task } from 'client/Task/types';
import { getTaskList } from 'client/lib/api/v1/task';
import { TaskStatus, TaskListResponse } from 'shared/types/tasks';

export const requestList = createAsyncAction(
  'TASK:REQUEST_TASK_LIST',
  'TASK:REQUEST_TASK_LIST_SUCCESS',
  'TASK:REQUEST_TASK_LIST_FAILURE'
)<undefined, TaskListResponse, string>();

export default (
  status: TaskStatus,
  sortField: string,
  sortDir: string,
  offset: number,
  limit: number
) => async (dispatch) => {
  dispatch(requestList.request());
  try {
    const res = await getTaskList(status, sortField, sortDir, offset, limit);

    dispatch(requestList.success(res));
  } catch (err) {
    dispatch(requestList.failure(err.message));
  }
};
