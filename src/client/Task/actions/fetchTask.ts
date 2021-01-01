import { createAsyncAction } from 'typesafe-actions';
import { Task } from 'client/Task/types';
import { getTask } from 'client/lib/api/v1/task';

export const requestTask = createAsyncAction(
  'TASK:REQUEST_TASK',
  'TASK:REQUEST_TASK_SUCCESS',
  'TASK:REQUEST_TASK_FAILURE'
)<undefined, Task, string>();

export default (taskId: string) => async (dispatch) => {
  dispatch(requestTask.request());
  try {
    const res = await getTask(taskId);

    dispatch(requestTask.success(res));
  } catch (err) {
    dispatch(requestTask.failure(err.message));
  }
};
