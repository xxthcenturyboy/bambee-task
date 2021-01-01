import { createAction } from 'typesafe-actions';
import { TaskStatus } from 'shared/types/tasks';

const type: 'TASK:SET_TASK_STATUS_VIEW' = 'TASK:SET_TASK_STATUS_VIEW';

export default createAction(type)<TaskStatus>();
