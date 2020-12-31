import { createAction } from 'typesafe-actions';
import { LoginView } from 'client/Auth/types';

const type: 'AUTH:SET_LOGIN_VIEW' = 'AUTH:SET_LOGIN_VIEW';

export default createAction(type)<LoginView>();
