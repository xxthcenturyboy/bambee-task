import { createAsyncAction } from 'typesafe-actions';
import { AuthFields } from 'client/Auth/types';
import { fetchLogin } from 'client/lib/api/v1/auth';
import { ProfileState } from 'shared/types/preload.interface';

export const requestLogin = createAsyncAction(
  'AUTH:LOGIN',
  'AUTH:LOGIN_SUCCESS',
  'AUTH:LOGIN_FAILURE'
)<undefined, ProfileState, string>();

const fetchUserLogin = (params: AuthFields) => async (dispatch) => {
  dispatch(requestLogin.request());
  try {
    const res = await fetchLogin(params.email, params.password);

    dispatch(requestLogin.success(res));
  } catch (err) {
    dispatch(requestLogin.failure(err.message));
  }
}

export default fetchUserLogin;
