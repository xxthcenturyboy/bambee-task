import { ProfileState } from 'shared/types/preload.interface';

/**
 * Redux State
 */
export type State = {
  /**
   * Active view in auth
   */
  loginView: LoginView;
  /**
   * Signup/login form stuff
   */
  isFetchingLogin: boolean;
  isFetchingSignup: boolean;
  loginError: string;
  signupError: string;
  loginResponse: ProfileState | undefined
  signupResponse: ProfileState | undefined;
  isFetchingLogout: boolean;
  logoutError: string;
  logoutResponse: boolean;
  username: string;
  password: string;
  passwordConfirm: string;
  /**
   * Returns info regarding whether an account exists
   */
  authLookup: AuthLookup | null;
  isFetchingAuthLookup: boolean;
  didInvalidateAuthLookup: boolean;
  authLookupError: string;
};

export enum LoginView {
  USERNAME = 'USERNAME',
  PWD_LOGIN = 'PWD_LOGIN',
  PWD_SIGNUP = 'PWD_SIGNUP',
  LOADING = 'LOADING',
}

export type AuthLookup = {
  exists: boolean;
};

export type AuthFields = {
  email: string;
  password: string;
  passwordConfirm?: string;
};
