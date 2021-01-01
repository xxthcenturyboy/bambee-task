import { createAction } from 'typesafe-actions';

const type: 'TASK:SET_LIMIT' = 'TASK:SET_LIMIT';

export default createAction(type)<number>();
