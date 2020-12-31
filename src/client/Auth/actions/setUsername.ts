import { createAction } from 'typesafe-actions';

const type: 'AUTH:SET_USERNAME' = 'AUTH:SET_USERNAME';

export default createAction(type)<string>();
