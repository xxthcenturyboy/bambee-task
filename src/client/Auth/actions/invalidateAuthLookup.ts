import { createAction } from 'typesafe-actions';

const type: 'AUTH:INVALIDATE_AUTH_LOOKUP' = 'AUTH:INVALIDATE_AUTH_LOOKUP';

export default createAction(type)();
