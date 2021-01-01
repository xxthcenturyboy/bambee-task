import { createAsyncAction } from 'typesafe-actions';
import { Task } from 'client/Task/types';
import { completeTask } from 'client/lib/api/v1/task';

export const requestComplete = createAsyncAction(
  'TASK:COMPLETE_TASK',
  'TASK:COMPLETE_TASK_SUCCESS',
  'TASK:COMPLETE_TASK_FAILURE'
)<undefined, Task, string>();

export default (taskId: string) => async (dispatch) => {
  dispatch(requestComplete.request());
  try {
    const res = await completeTask(taskId);

    dispatch(requestComplete.success(res));
  } catch (err) {
    dispatch(requestComplete.failure(err.message));
  }
};
