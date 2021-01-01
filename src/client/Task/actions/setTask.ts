import { createAction } from 'typesafe-actions';
import { Task } from 'client/Task/types';

const type: 'TASK:SET_TASK_EDIT' = 'TASK:SET_TASK_EDIT';

export default createAction(type)<Task>();
