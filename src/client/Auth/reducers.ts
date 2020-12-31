import { getType, ActionType } from 'typesafe-actions';
import actions from './actions';
import { State, LoginView } from './types';

export type Action = ActionType<typeof actions>;
export { State };

export const initialState: State = {
  loginView: LoginView.USERNAME,
  authLookup: null,
  isFetchingAuthLookup: false,
  didInvalidateAuthLookup: false,
  authLookupError: '',
  isFetchingSignup: false,
  signupError: '',
  signupResponse: undefined,
  isFetchingLogin: false,
  loginError: '',
  loginResponse: undefined,
  isFetchingLogout: false,
  logoutError: '',
  logoutResponse: false,
  username: '',
  password: '',
  passwordConfirm: '',
};

// tslint:disable-next-line:cyclomatic-complexity
const appReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {

    case getType(actions.setLoginView): return {
      ...state,
      loginView: action.payload
    };

    case getType(actions.setUsername): return {
      ...state,
      username: action.payload
    };

    case getType(actions.setPassword): return {
      ...state,
      password: action.payload
    };

    case getType(actions.setPasswordConfirm): return {
      ...state,
      passwordConfirm: action.payload
    };

    case getType(actions.requestLookup.request): return {
      ...state,
      isFetchingAuthLookup: true,
      authLookupError: ''
    };

    case getType(actions.requestLookup.success): return {
      ...state,
      authLookup: action.payload,
      isFetchingAuthLookup: false,
      didInvalidateAuthLookup: false
    };

    case getType(actions.requestLookup.failure): return {
      ...state,
      authLookupError: action.payload,
      isFetchingAuthLookup: false,
      didInvalidateAuthLookup: false,
    };

    case getType(actions.invalidateAuthLookup): return {
      ...state,
      didInvalidateAuthLookup: true
    };

    case getType(actions.requestSignup.request): return {
      ...state,
      isFetchingSignup: true,
      signupError: '',
      signupResponse: undefined
    };

    case getType(actions.requestSignup.success): return {
      ...state,
      isFetchingSignup: false,
      signupError: '',
      signupResponse: action.payload,
      password: '',
      passwordConfirm: '',
      logoutError: '',
      logoutResponse: false
    };

    case getType(actions.requestSignup.failure): return {
      ...state,
      isFetchingSignup: false,
      signupError: action.payload,
      signupResponse: undefined
    };

    case getType(actions.requestLogin.request): return {
      ...state,
      isFetchingLogin: true,
      loginError: '',
      loginResponse: undefined
    };

    case getType(actions.requestLogin.success): return {
      ...state,
      isFetchingLogin: false,
      loginError: '',
      loginResponse: action.payload,
      password: '',
      passwordConfirm: '',
      logoutError: '',
      logoutResponse: false
    };

    case getType(actions.requestLogin.failure): return {
      ...state,
      isFetchingLogin: false,
      loginError: action.payload,
      loginResponse: undefined,
    };

    case getType(actions.requestLogout.request): return {
      ...state,
      isFetchingLogout: true,
      logoutError: '',
      logoutResponse: false
    };

    case getType(actions.requestLogout.success): return {
      ...state,
      isFetchingLogout: false,
      logoutError: '',
      logoutResponse: action.payload,
    };

    case getType(actions.requestLogout.failure): return {
      ...state,
      isFetchingLogout: false,
      logoutError: action.payload,
      logoutResponse: false,
    };

    default: return state;
  }
};

export default appReducer;
