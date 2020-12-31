import { createAction } from 'typesafe-actions';

const type: 'AUTH:SET_PASSWORD_CONFIRM' = 'AUTH:SET_PASSWORD_CONFIRM';

export default createAction(type)<string>();
