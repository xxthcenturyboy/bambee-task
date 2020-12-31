import { RootState } from 'client/index';
import * as PI from 'shared/types/preload.interface';

export default function getUser(state: RootState): PI.ProfileState | null {
  return state.user && state.user.profile;
}
