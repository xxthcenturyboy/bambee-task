import { createAsyncAction } from 'typesafe-actions';
import { Task } from 'client/Task/types';
import { updateTask } from 'client/lib/api/v1/task';

export const requestUpdate = createAsyncAction(
  'TASK:UPDATE_TASK',
  'TASK:UPDATE_TASK_SUCCESS',
  'TASK:UPDATE_TASK_FAILURE'
)<undefined, Task, string>();

export default (taskId: string, name?: string, description?: string, dueDate?: string) => async (dispatch) => {
  dispatch(requestUpdate.request());
  try {
    const res = await updateTask(taskId, name, description, dueDate);

    dispatch(requestUpdate.success(res));
  } catch (err) {
    dispatch(requestUpdate.failure(err.message));
  }
};
