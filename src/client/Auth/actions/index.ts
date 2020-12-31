import { requestLookup } from './fetchAuthLookup';
import invalidateAuthLookup from './invalidateAuthLookup';
import { requestLogin } from './login';
import setPasswordConfirm from './setPasswordConfirm';
import setLoginView from './setLoginView';
import setPassword from './setPassword';
import setUsername from './setUsername';
import { requestSignup } from './signup';
import { requestLogout } from './logout';

export default {
  requestLookup,
  invalidateAuthLookup,
  requestLogin,
  setPasswordConfirm,
  setLoginView,
  setPassword,
  setUsername,
  requestSignup,
  requestLogout,
};
