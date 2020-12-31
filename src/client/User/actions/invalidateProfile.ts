import { createAction } from 'typesafe-actions';

const type: 'USER:INVALIDATE_PROFILE' = 'USER:INVALIDATE_PROFILE';

export default createAction(type)();
