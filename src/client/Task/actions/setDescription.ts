import { createAction } from 'typesafe-actions';

const type: 'TASK:SET_TASK_DESCRIPTION' = 'TASK:SET_TASK_DESCRIPTION';

export default createAction(type)<string>();
