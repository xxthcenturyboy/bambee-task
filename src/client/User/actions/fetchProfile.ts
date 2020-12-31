import { createAsyncAction } from 'typesafe-actions';
import { ProfileState } from 'shared/types/preload.interface';
import { getProfile } from 'client/lib/api/v1/user';

export const requestProfile = createAsyncAction(
  'USER:REQUEST_PROFILE',
  'USER:REQUEST_PROFILE_SUCCESS',
  'USER:REQUEST_PROFILE_FAILURE'
)<undefined, ProfileState, string>();

const fetchProfile = () => async (dispatch) => {
  try {
    dispatch(requestProfile.request());
    const res = await getProfile();

    dispatch(requestProfile.success(res));
  } catch (err) {
    dispatch(requestProfile.failure(err.message));
  }
};

export default fetchProfile;
