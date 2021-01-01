import { createAsyncAction } from 'typesafe-actions';
import { Task } from 'client/Task/types';
import { createTask } from 'client/lib/api/v1/task';

export const requestCreate = createAsyncAction(
  'TASK:CREATE_TASK',
  'TASK:CREATE_TASK_SUCCESS',
  'TASK:CREATE_TASK_FAILURE'
)<undefined, Task, string>();

export default (name?: string, description?: string, dueDate?: string) => async (dispatch) => {
  dispatch(requestCreate.request());
  try {
    const res = await createTask(name, description, dueDate);

    dispatch(requestCreate.success(res));
  } catch (err) {
    dispatch(requestCreate.failure(err.message));
  }
};
