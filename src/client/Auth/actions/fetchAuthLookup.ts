import { createAsyncAction } from 'typesafe-actions';
import { AuthLookup } from 'client/Auth/types';
import { fetchLookup } from 'client/lib/api/v1/auth';

export const requestLookup = createAsyncAction(
  'AUTH:REQUEST_AUTH_LOOKUP',
  'AUTH:REQUEST_AUTH_LOOKUP_SUCCESS',
  'AUTH:REQUEST_AUTH_LOOKUP_FAILURE'
)<undefined, AuthLookup, string>();

export default (email: string) => async (dispatch) => {
  dispatch(requestLookup.request());
  try {
    const res = await fetchLookup(email);

    dispatch(requestLookup.success(res));
  } catch (err) {
    dispatch(requestLookup.failure(err.message));
  }
};
