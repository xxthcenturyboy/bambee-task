import { createAsyncAction } from 'typesafe-actions';
import { AuthFields } from 'client/Auth/types';
import { fetchSignup } from 'client/lib/api/v1/auth';
import { ProfileState } from 'shared/types/preload.interface';

export const requestSignup = createAsyncAction(
  'AUTH:SIGNUP',
  'AUTH:SIGNUP_SUCCESS',
  'AUTH:SIGNUP_FAILURE'
)<undefined, ProfileState, string>();

export default (params: AuthFields) => async (dispatch) => {
  try {
    dispatch(requestSignup.request());
    const res = await fetchSignup(params.email, params.password, params.passwordConfirm || '');

    dispatch(requestSignup.success(res));
  } catch (err) {
    dispatch(requestSignup.failure(err.message));
  }
};
