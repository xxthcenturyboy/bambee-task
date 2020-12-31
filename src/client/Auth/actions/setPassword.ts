import { createAction } from 'typesafe-actions';

const type: 'AUTH:SET_PASSWORD' = 'AUTH:SET_PASSWORD';

export default createAction(type)<string>();
