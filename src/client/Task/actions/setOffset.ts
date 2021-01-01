import { createAction } from 'typesafe-actions';

const type: 'TASK:SET_OFFSET' = 'TASK:SET_OFFSET';

export default createAction(type)<number>();
