import { createAction } from 'typesafe-actions';

const type: 'TASK:SET_TASK_NAME' = 'TASK:SET_TASK_NAME';

export default createAction(type)<string>();
