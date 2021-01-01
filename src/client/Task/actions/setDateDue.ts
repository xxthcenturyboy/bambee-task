import { createAction } from 'typesafe-actions';

const type: 'TASK:SET_TASK_DATE_DUE' = 'TASK:SET_TASK_DATE_DUE';

export default createAction(type)<Date>();
