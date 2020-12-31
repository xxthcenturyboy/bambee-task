import { RootState } from 'client/index';
import { Dispatch } from 'redux';

///////////////////

export default async function run(state: RootState, dispatch: Dispatch): Promise<void> {
  // ensure user is Authenticated
  if (!(state.user.profile && state.user.profile.id)) {
    return;
  }

  return;
}
