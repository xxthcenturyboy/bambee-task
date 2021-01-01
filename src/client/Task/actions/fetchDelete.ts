import { createAsyncAction } from 'typesafe-actions';
import { Task } from 'client/Task/types';
import { deleteTask } from 'client/lib/api/v1/task';

export const requestDelete = createAsyncAction(
  'TASK:DELETE_TASK',
  'TASK:DELETE_TASK_SUCCESS',
  'TASK:DELETE_TASK_FAILURE'
)<undefined, Task, string>();

export default (taskId: string) => async (dispatch) => {
  dispatch(requestDelete.request());
  try {
    const res = await deleteTask(taskId);

    dispatch(requestDelete.success(res));
  } catch (err) {
    dispatch(requestDelete.failure(err.message));
  }
};
