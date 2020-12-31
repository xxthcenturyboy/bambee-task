import { createAsyncAction } from 'typesafe-actions';
import { fetchLogout } from 'client/lib/api/v1/auth';

export const requestLogout = createAsyncAction(
  'AUTH:LOGOUT',
  'AUTH:LOGOUT_SUCCESS',
  'AUTH:LOGOUT_FAILURE'
)<undefined, boolean, string>();

const fetchUserLogout = () => async (dispatch) => {
  try {
    dispatch(requestLogout.request());

    const res = await fetchLogout();

    dispatch(requestLogout.success(res));
  } catch (err) {
    dispatch(requestLogout.failure(err.message));
  }
}

export default fetchUserLogout;
